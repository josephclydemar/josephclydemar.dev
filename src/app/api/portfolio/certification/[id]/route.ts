import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/auth-server';
import { cookies } from 'next/headers';

type RouteContext = {
  params: Promise<{ id: string }>;
};

// PUT - Update certification
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

    // Validate required fields
    if (!body.name || !body.issuer || !body.issueDate || !body.description || !body.skills) {
      return NextResponse.json(
        { error: 'Missing required fields: name, issuer, issueDate, description, skills' },
        { status: 400 }
      );
    }

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
    };

    const { data, error } = await supabase
      .from('certifications')
      .update(certificationData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating certification:', error);
      return NextResponse.json({ error: 'Failed to update certification' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete certification
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
      .from('certifications')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting certification:', error);
      return NextResponse.json({ error: 'Failed to delete certification' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
