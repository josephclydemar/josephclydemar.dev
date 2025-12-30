import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/auth-server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const supabase = createClient(cookies());

    const { data, error } = await supabase
      .from('educations')
      .select('*')
      .order('order', { ascending: true })
      .order('start_date', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching educations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch educations' },
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
      school,
      degree,
      field,
      start_date,
      end_date,
      logo,
      description,
      courses,
      achievements,
      gpa,
      order,
    } = body;

    // Validate required fields
    if (!school || !degree || !field || !start_date) {
      return NextResponse.json(
        { error: 'School, degree, field, and start date are required' },
        { status: 400 }
      );
    }

    // If no order provided, get the max order and add 1
    let educationOrder = order;
    if (!educationOrder) {
      const { data: maxOrderData } = await supabase
        .from('educations')
        .select('order')
        .order('order', { ascending: false })
        .limit(1)
        .single();

      educationOrder = maxOrderData?.order ? maxOrderData.order + 1 : 1;
    }

    const { data, error } = await supabase
      .from('educations')
      .insert({
        school,
        degree,
        field,
        start_date,
        end_date: end_date || null,
        logo: logo || null,
        description: description || null,
        courses: courses || [],
        achievements: achievements || [],
        gpa: gpa || null,
        order: educationOrder,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating education:', error);
    return NextResponse.json(
      { error: 'Failed to create education' },
      { status: 500 }
    );
  }
}
