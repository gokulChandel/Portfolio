import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getExperiences, saveExperience, deleteExperience } from '@/lib/data/store';

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const experiences = await getExperiences();
  return NextResponse.json(experiences);
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const id = body.id || `exp-${Date.now()}`;
    const saved = await saveExperience({ ...body, id });
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    console.error('Save experience error:', err);
    return NextResponse.json({ error: 'Failed to save experience' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const saved = await saveExperience(body);
    return NextResponse.json(saved);
  } catch (err) {
    console.error('Update experience error:', err);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
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
    return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 });
  }
  await deleteExperience(id);
  return NextResponse.json({ success: true });
}
