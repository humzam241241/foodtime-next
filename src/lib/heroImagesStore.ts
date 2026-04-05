/**
 * Hero slide config storage.
 *
 * Strategy: store a small JSON file `config/hero-images.json` in Vercel Blob.
 * Read: `list({ prefix })` to find the config blob, then fetch it.
 * Write: `put(pathname, body, { access: 'public', allowOverwrite: true, addRandomSuffix: false })`.
 *
 * Gracefully falls back to `defaultHeroSlides` when:
 *   - BLOB_READ_WRITE_TOKEN is not set (Blob integration not yet enabled)
 *   - No config blob exists yet
 *   - Any fetch/parse error
 */
import { put, list, type ListBlobResultBlob } from '@vercel/blob';
import { defaultHeroSlides, type HeroSlide } from '@/data/defaultHeroImages';

const CONFIG_PATHNAME = 'config/hero-images.json';

function hasBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function readHeroSlides(): Promise<{ slides: HeroSlide[]; source: 'blob' | 'default' }> {
  if (!hasBlob()) return { slides: defaultHeroSlides, source: 'default' };

  try {
    const { blobs } = await list({ prefix: CONFIG_PATHNAME, limit: 1 });
    const entry: ListBlobResultBlob | undefined = blobs.find(b => b.pathname === CONFIG_PATHNAME);
    if (!entry) return { slides: defaultHeroSlides, source: 'default' };

    // Blob URLs are public — fetch with no Next cache so admin edits show up immediately.
    const res = await fetch(entry.url, { cache: 'no-store' });
    if (!res.ok) return { slides: defaultHeroSlides, source: 'default' };

    const data = (await res.json()) as { slides?: HeroSlide[] };
    if (!Array.isArray(data.slides) || data.slides.length === 0) {
      return { slides: defaultHeroSlides, source: 'default' };
    }
    return { slides: data.slides, source: 'blob' };
  } catch (err) {
    console.error('[heroImagesStore] read failed, using defaults:', err);
    return { slides: defaultHeroSlides, source: 'default' };
  }
}

export async function writeHeroSlides(slides: HeroSlide[]): Promise<void> {
  if (!hasBlob()) {
    throw new Error('Vercel Blob is not configured. Set BLOB_READ_WRITE_TOKEN.');
  }

  const body = JSON.stringify({ slides, updatedAt: new Date().toISOString() }, null, 2);
  await put(CONFIG_PATHNAME, body, {
    access: 'public',
    contentType: 'application/json',
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 60, // short edge cache — fresh within a minute for all visitors
  });
}

export function blobConfigured(): boolean {
  return hasBlob();
}
