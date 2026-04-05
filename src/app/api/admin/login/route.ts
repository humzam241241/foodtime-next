import { NextResponse } from 'next/server';
import { checkPassword, createSessionCookie } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }

  const password = (body.password ?? '').toString();
  if (!password) {
    return NextResponse.json({ ok: false, error: 'Password required' }, { status: 400 });
  }

  if (!checkPassword(password)) {
    // Small delay mitigates brute force timing attacks
    await new Promise(r => setTimeout(r, 300));
    return NextResponse.json({ ok: false, error: 'Incorrect password' }, { status: 401 });
  }

  const cookie = createSessionCookie();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookie.name, cookie.value, cookie.options);
  return res;
}
