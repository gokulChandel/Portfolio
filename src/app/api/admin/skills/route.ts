import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getSkills, getSkillCategories, saveSkill, deleteSkill } from '@/lib/data/store';

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const [skills, categories] = await Promise.all([getSkills(false), getSkillCategories()]);
  return NextResponse.json({ skills, categories });
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const id = body.id || `sk-${Date.now()}`;
    const saved = await saveSkill({ ...body, id });
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    console.error('Save skill error:', err);
    return NextResponse.json({ error: 'Failed to save skill' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const saved = await saveSkill(body);
    return NextResponse.json(saved);
  } catch (err) {
    console.error('Update skill error:', err);
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
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
    return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
  }
  await deleteSkill(id);
  return NextResponse.json({ success: true });
}
