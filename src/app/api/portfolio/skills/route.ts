import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/auth-server';
import { cookies } from 'next/headers';

// GET - Get all skills
export async function GET() {
  try {
    const supabase = createClient(cookies());

    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching skills:', error);
      return NextResponse.json(
        { error: 'Failed to fetch skills' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/portfolio/skills:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new skill
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(cookies());
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, category, proficiency, icon, order } = body;

    // Validate required fields
    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      );
    }

    // Get the highest order value if not provided
    let finalOrder = order;
    if (finalOrder === undefined || finalOrder === null) {
      const { data: maxOrderSkill } = await supabase
        .from('skills')
        .select('order')
        .order('order', { ascending: false })
        .limit(1)
        .single();

      finalOrder = (maxOrderSkill?.order ?? -1) + 1;
    }

    // Insert the skill
    const { data, error } = await supabase
      .from('skills')
      .insert({
        name,
        category,
        proficiency: proficiency || null,
        icon: icon || null,
        order: finalOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating skill:', error);
      return NextResponse.json(
        { error: 'Failed to create skill' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/portfolio/skills:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
