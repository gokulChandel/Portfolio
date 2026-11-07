import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getCertifications, saveCertification, deleteCertification } from '@/lib/data/store';

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const certs = await getCertifications();
  return NextResponse.json(certs);
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const id = body.id || `cert-${Date.now()}`;
    const saved = await saveCertification({ ...body, id });
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    console.error('Save certification error:', err);
    return NextResponse.json({ error: 'Failed to save certification' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const saved = await saveCertification(body);
    return NextResponse.json(saved);
  } catch (err) {
    console.error('Update certification error:', err);
    return NextResponse.json({ error: 'Failed to update certification' }, { status: 500 });
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
    return NextResponse.json({ error: 'Certification ID is required' }, { status: 400 });
  }
  await deleteCertification(id);
  return NextResponse.json({ success: true });
}
