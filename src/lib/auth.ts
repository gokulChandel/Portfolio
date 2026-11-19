import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;
const COOKIE_NAME = 'admin_session_token';
const INSECURE_PASSWORDS = new Set([
  'admin123456',
  'admin12345',
  'change_this_to_a_secure_password_in_production',
]);
const INSECURE_SESSION_SECRETS = new Set([
  'dev-secret-session-key-gokul-chandel-portfolio-2026',
  'super-secret-admin-session-encryption-key-min-32-chars',
]);

interface SessionData {
  email: string;
  role: string;
  expiresAt: number;
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(
    ADMIN_EMAIL &&
      ADMIN_PASSWORD &&
      ADMIN_PASSWORD.length >= 16 &&
      !INSECURE_PASSWORDS.has(ADMIN_PASSWORD) &&
      !ADMIN_PASSWORD.toLowerCase().includes('replace-with') &&
      SESSION_SECRET &&
      SESSION_SECRET.length >= 32 &&
      !INSECURE_SESSION_SECRETS.has(SESSION_SECRET) &&
      !SESSION_SECRET.toLowerCase().includes('replace-with')
  );
}

function signSession(data: SessionData): string {
  if (!isAdminAuthConfigured() || !SESSION_SECRET) {
    throw new Error('Admin authentication is not configured securely');
  }
  const payload = Buffer.from(JSON.stringify(data)).toString('base64');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

function verifyToken(token: string): SessionData | null {
  if (!SESSION_SECRET || !isAdminAuthConfigured()) return null;

  try {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return null;

    const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
    if (signature !== expectedSignature) return null;

    const decoded: SessionData = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));
    if (Date.now() > decoded.expiresAt) return null;

    return decoded;
  } catch {
    return null;
  }
}

export async function verifyAdminSession(): Promise<boolean> {
  if (!isAdminAuthConfigured() || !ADMIN_EMAIL) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const session = verifyToken(token);
  return Boolean(session && session.email === ADMIN_EMAIL);
}

export async function createAdminSession(email: string): Promise<string> {
  if (!isAdminAuthConfigured()) {
    throw new Error('Admin authentication is not configured securely');
  }
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const token = signSession({ email, role: 'admin', expiresAt });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });
  return token;
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function validateAdminCredentials(email: string, pass: string): boolean {
  return Boolean(
    isAdminAuthConfigured() &&
      ADMIN_EMAIL &&
      ADMIN_PASSWORD &&
      email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      pass === ADMIN_PASSWORD
  );
}
