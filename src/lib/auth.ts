/**
 * Simple HMAC-signed cookie session for the admin area.
 * No external auth dependencies — uses Node's built-in crypto.
 *
 * Env vars:
 *   ADMIN_PASSWORD  - plain text password the admin logs in with
 *   ADMIN_SECRET    - HMAC secret for signing session cookies (any long random string)
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE = 'ft_admin_session';
const SESSION_MAX_AGE_SEC = 60 * 60 * 8; // 8 hours

type Payload = { sub: string; exp: number };

function b64urlEncode(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(str: string): Buffer {
  const pad = 4 - (str.length % 4 || 4);
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(pad % 4);
  return Buffer.from(padded, 'base64');
}

function getSecret(): string {
  const s = process.env.ADMIN_SECRET;
  if (!s || s.length < 16) {
    throw new Error('ADMIN_SECRET env var is missing or too short (min 16 chars).');
  }
  return s;
}

export function sign(payload: Payload): string {
  const secret = getSecret();
  const body = b64urlEncode(Buffer.from(JSON.stringify(payload)));
  const sig = createHmac('sha256', secret).update(body).digest();
  return `${body}.${b64urlEncode(sig)}`;
}

export function verify(token: string | undefined | null): Payload | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [body, sig] = parts;

  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return null;
  }

  const expected = createHmac('sha256', secret).update(body).digest();
  const given = b64urlDecode(sig);
  if (expected.length !== given.length) return null;
  if (!timingSafeEqual(expected, given)) return null;

  try {
    const payload = JSON.parse(b64urlDecode(body).toString('utf8')) as Payload;
    if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function createSessionCookie(): { name: string; value: string; options: Record<string, unknown> } {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SEC;
  const token = sign({ sub: 'admin', exp });
  return {
    name: SESSION_COOKIE,
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: SESSION_MAX_AGE_SEC,
    },
  };
}

export function clearSessionCookie(): { name: string; value: string; options: Record<string, unknown> } {
  return {
    name: SESSION_COOKIE,
    value: '',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 0,
    },
  };
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
