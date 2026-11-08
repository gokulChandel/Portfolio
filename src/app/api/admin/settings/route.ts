import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyAdminSession } from '@/lib/auth';
import { getSiteSettings, updateSiteSettings } from '@/lib/data/store';
import { isSiteColors } from '@/lib/siteColorThemes';
import type { SiteSettings } from '@/types';

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid settings payload' }, { status: 400 });
    }

    const settings = body as Partial<SiteSettings>;
    if (
      ('light_colors' in settings && !isSiteColors(settings.light_colors)) ||
      ('dark_colors' in settings && !isSiteColors(settings.dark_colors))
    ) {
      return NextResponse.json({ error: 'Colors must be six-digit hexadecimal values' }, { status: 400 });
    }

    const updated = await updateSiteSettings(settings);
    revalidatePath('/', 'layout');
    return NextResponse.json(updated);
  } catch (err) {
    console.error('Update settings error:', err);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
