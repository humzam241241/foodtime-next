import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { isAdmin } from '@/lib/adminGuard';

export const runtime = 'nodejs';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);

/**
 * Server-side magic-byte sniff. Do NOT trust file.type (client controlled).
 * Returns the detected MIME string if the buffer is a recognised image,
 * otherwise null.
 */
function detectImageMime(buf: Buffer): string | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return 'image/jpeg';
  }
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47 &&
    buf[4] === 0x0d && buf[5] === 0x0a && buf[6] === 0x1a && buf[7] === 0x0a
  ) {
    return 'image/png';
  }
  if (buf.length >= 6) {
    const head = buf.slice(0, 6).toString('ascii');
    if (head === 'GIF87a' || head === 'GIF89a') return 'image/gif';
  }
  if (
    buf.length >= 12 &&
    buf.slice(0, 4).toString('ascii') === 'RIFF' &&
    buf.slice(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'image/webp';
  }
  if (buf.length >= 12 && buf.slice(4, 8).toString('ascii') === 'ftyp') {
    const brand = buf.slice(8, 12).toString('ascii');
    if (brand === 'avif' || brand === 'avis') return 'image/avif';
  }
  return null;
}

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

  // Cheap pre-check on the client-declared type so we reject obvious junk
  // before allocating a 10 MB buffer.
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
    return NextResponse.json(
      { ok: false, error: `File too large (max ${MAX_BYTES / 1024 / 1024} MB)` },
      { status: 413 },
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const detectedMime = detectImageMime(buf);
  if (!detectedMime || !ALLOWED.has(detectedMime)) {
    return NextResponse.json(
      { ok: false, error: 'File contents do not match a supported image format.' },
      { status: 415 },
    );
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80) || 'upload';
  const pathname = `uploads/${safeName}`;

  try {
    const result = await put(pathname, buf, {
      access: 'public',
      contentType: detectedMime, // server-decided, not client-declared
      addRandomSuffix: true,
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
    console.error('[upload] put failed:', err);
    return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 });
  }
}
