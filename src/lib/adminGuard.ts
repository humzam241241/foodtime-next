import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, verify } from './auth';

/** For server components — redirects to login if not signed in. */
export async function requireAdmin(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!verify(token)) {
    redirect('/admin/login');
  }
}

/** For API routes — returns true if the request has a valid session. */
export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  return verify(token) !== null;
}
