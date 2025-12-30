import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/auth-server';
import { cookies } from 'next/headers';

// PUT - Update personal information
export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient(cookies());
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { profilePicture, greeting, position, aboutMe } = body;

    // Validate required fields
    if (!greeting || !position || !aboutMe) {
      return NextResponse.json(
        { error: 'Greeting, position, and about me are required' },
        { status: 400 }
      );
    }

    // Get the config (assuming only one config exists)
    const { data: existingConfig, error: fetchError } = await supabase
      .from('portfolio_config')
      .select('id')
      .limit(1)
      .single();

    if (fetchError || !existingConfig) {
      return NextResponse.json(
        { error: 'Portfolio configuration not found' },
        { status: 404 }
      );
    }

    // Update the personal info
    const { data, error } = await supabase
      .from('portfolio_config')
      .update({
        profile_picture: profilePicture || null,
        greeting,
        position,
        about_me: aboutMe,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existingConfig.id)
      .select('id, profile_picture, greeting, position, about_me')
      .single();

    if (error) {
      console.error('Error updating personal info:', error);
      return NextResponse.json(
        { error: 'Failed to update personal information' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: data.id,
      profilePicture: data.profile_picture,
      greeting: data.greeting,
      position: data.position,
      aboutMe: data.about_me,
    });
  } catch (error) {
    console.error('Error in PUT /api/portfolio/personal-info:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
