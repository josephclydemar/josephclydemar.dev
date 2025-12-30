import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/auth-server';
import { cookies } from 'next/headers';

// GET - Fetch all certifications
export async function GET() {
  try {
    const supabase = createClient(cookies());

    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('order', { ascending: true })
      .order('issue_date', { ascending: false });

    if (error) {
      console.error('Error fetching certifications:', error);
      return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new certification
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(cookies());

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.issuer || !body.issueDate || !body.description || !body.skills) {
      return NextResponse.json(
        { error: 'Missing required fields: name, issuer, issueDate, description, skills' },
        { status: 400 }
      );
    }

    // Get the maximum order value
    const { data: maxOrderData } = await supabase
      .from('certifications')
      .select('order')
      .order('order', { ascending: false })
      .limit(1);

    const newOrder = maxOrderData && maxOrderData.length > 0 ? (maxOrderData[0].order || 0) + 1 : 1;

    const certificationData = {
      name: body.name,
      issuer: body.issuer,
      issue_date: body.issueDate,
      expiry_date: body.expiryDate || null,
      credential_id: body.credentialId || null,
      credential_url: body.credentialUrl || null,
      logo: body.logo || null,
      description: body.description,
      skills: body.skills || [],
      validation_details: body.validationDetails || null,
      order: newOrder,
    };

    const { data, error } = await supabase
      .from('certifications')
      .insert([certificationData])
      .select()
      .single();

    if (error) {
      console.error('Error creating certification:', error);
      return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
