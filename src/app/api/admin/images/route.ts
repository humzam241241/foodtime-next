import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/adminGuard';
import { listAllImages } from '@/lib/imageLibrary';
import { blobConfigured } from '@/lib/heroImagesStore';

export const runtime = 'nodejs';

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const images = await listAllImages();
  return NextResponse.json({ ok: true, images, blobConfigured: blobConfigured() });
}
