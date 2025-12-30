import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/auth-server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const supabase = createClient(cookies());

    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order', { ascending: true })
      .order('start_date', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(cookies());

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      position,
      company,
      employment_type,
      location,
      start_date,
      end_date,
      logo,
      description,
      responsibilities,
      achievements,
      skills,
      order,
    } = body;

    // Validate required fields
    if (!position || !company || !start_date) {
      return NextResponse.json(
        { error: 'Position, company, and start date are required' },
        { status: 400 }
      );
    }

    // If no order provided, get the max order and add 1
    let experienceOrder = order;
    if (!experienceOrder) {
      const { data: maxOrderData } = await supabase
        .from('experiences')
        .select('order')
        .order('order', { ascending: false })
        .limit(1)
        .single();

      experienceOrder = maxOrderData?.order ? maxOrderData.order + 1 : 1;
    }

    const { data, error } = await supabase
      .from('experiences')
      .insert({
        position,
        company,
        employment_type: employment_type || 'Full-time',
        location: location || null,
        start_date,
        end_date: end_date || null,
        logo: logo || null,
        description: description || null,
        responsibilities: responsibilities || [],
        achievements: achievements || [],
        skills: skills || [],
        order: experienceOrder,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}
