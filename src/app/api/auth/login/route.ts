import { NextRequest, NextResponse } from 'next/server';
import {
  createAdminSession,
  isAdminAuthConfigured,
  validateAdminCredentials,
} from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    if (!isAdminAuthConfigured()) {
      return NextResponse.json(
        {
          error:
            'Admin login is not configured securely. Set ADMIN_EMAIL, an ADMIN_PASSWORD with at least 16 characters, and an ADMIN_SESSION_SECRET with at least 32 characters.',
        },
        { status: 503 }
      );
    }

    const body: unknown = await req.json();
    if (!body || typeof body !== 'object' || !('email' in body) || !('password' in body)) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    const { email, password } = body;

    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const isValid = validateAdminCredentials(email, password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    await createAdminSession(email);

    return NextResponse.json({ success: true, message: 'Logged in successfully' });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
