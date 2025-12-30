import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/auth-server';
import { cookies } from 'next/headers';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
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

    const { data, error } = await supabase
      .from('experiences')
      .update({
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
        order: order || 1,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = createClient(cookies());

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    );
  }
}
