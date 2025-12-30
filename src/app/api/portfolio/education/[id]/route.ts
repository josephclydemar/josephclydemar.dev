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

    const { data, error } = await supabase
      .from('educations')
      .update({
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
        order: order || 1,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating education:', error);
    return NextResponse.json(
      { error: 'Failed to update education' },
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
      .from('educations')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error('Error deleting education:', error);
    return NextResponse.json(
      { error: 'Failed to delete education' },
      { status: 500 }
    );
  }
}
