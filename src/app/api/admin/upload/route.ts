import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { isAdmin } from '@/lib/adminGuard';

export const runtime = 'nodejs';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { ok: false, error: 'Vercel Blob is not configured (BLOB_READ_WRITE_TOKEN missing).' },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Expected multipart/form-data' }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'Missing file field' }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { ok: false, error: `Unsupported type ${file.type}. Allowed: jpeg, png, webp, gif, avif.` },
      { status: 415 },
    );
  }
  if (file.size === 0) {
    return NextResponse.json({ ok: false, error: 'Empty file' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: `File too large (max ${MAX_BYTES / 1024 / 1024} MB)` }, { status: 413 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80) || 'upload';
  const pathname = `uploads/${safeName}`;

  try {
    const result = await put(pathname, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: true, // avoid collisions across uploads with same name
    });
    return NextResponse.json({
      ok: true,
      image: {
        src: result.url,
        name: safeName,
        source: 'blob' as const,
        pathname: result.pathname,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Upload failed';
    console.error('[upload] put failed:', err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
