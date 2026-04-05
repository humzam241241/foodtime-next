import { NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { isAdmin } from '@/lib/adminGuard';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Blob not configured' }, { status: 503 });
  }

  let body: { pathname?: string };
  try {
    body = (await req.json()) as { pathname?: string };
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const pathname = (body.pathname ?? '').toString();
  if (!pathname || !pathname.startsWith('uploads/')) {
    return NextResponse.json(
      { ok: false, error: 'Only uploaded files (uploads/*) can be deleted' },
      { status: 400 },
    );
  }

  try {
    await del(pathname);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Delete failed';
    console.error('[delete-image] failed:', err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
