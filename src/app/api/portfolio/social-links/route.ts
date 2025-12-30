import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/auth-server';
import { cookies } from 'next/headers';

// GET - Get all social links
export async function GET() {
  try {
    const supabase = createClient(cookies());

    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching social links:', error);
      return NextResponse.json(
        { error: 'Failed to fetch social links' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/portfolio/social-links:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new social link
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(cookies());
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, icon, url } = body;

    // Validate required fields
    if (!name || !icon || !url) {
      return NextResponse.json(
        { error: 'Name, icon, and URL are required' },
        { status: 400 }
      );
    }

    // Get the current max order
    const { data: maxOrderData } = await supabase
      .from('social_links')
      .select('order')
      .order('order', { ascending: false })
      .limit(1)
      .single();

    const nextOrder = (maxOrderData?.order ?? -1) + 1;

    // Insert the new link
    const { data, error } = await supabase
      .from('social_links')
      .insert({
        name,
        icon,
        url,
        order: nextOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating social link:', error);
      return NextResponse.json(
        { error: 'Failed to create social link' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/portfolio/social-links:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
