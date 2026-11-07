import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getEducation, saveEducation, deleteEducation } from '@/lib/data/store';

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const education = await getEducation();
  return NextResponse.json(education);
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const id = body.id || `edu-${Date.now()}`;
    const saved = await saveEducation({ ...body, id });
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    console.error('Save education error:', err);
    return NextResponse.json({ error: 'Failed to save education' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const saved = await saveEducation(body);
    return NextResponse.json(saved);
  } catch (err) {
    console.error('Update education error:', err);
    return NextResponse.json({ error: 'Failed to update education' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Education ID is required' }, { status: 400 });
  }
  await deleteEducation(id);
  return NextResponse.json({ success: true });
}
