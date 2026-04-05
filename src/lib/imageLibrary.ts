/**
 * Lists every image the admin can pick from:
 *   - Built-in files in /public/images (shipped with the repo)
 *   - Uploaded files in Vercel Blob under the "uploads/" prefix
 */
import { list } from '@vercel/blob';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export type AvailableImage = {
  src: string;            // URL to render in <img>/<Image>
  name: string;           // Display name
  source: 'builtin' | 'blob';
  pathname?: string;      // Blob pathname (for deletion) — blob only
  size?: number;          // bytes — blob only
};

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

async function listBuiltin(): Promise<AvailableImage[]> {
  try {
    const dir = join(process.cwd(), 'public', 'images');
    const entries = await readdir(dir);
    return entries
      .filter(n => IMAGE_EXT.test(n))
      .sort()
      .map(n => ({
        src: `/images/${n}`,
        name: n,
        source: 'builtin' as const,
      }));
  } catch (err) {
    console.error('[imageLibrary] failed to read public/images:', err);
    return [];
  }
}

async function listUploaded(): Promise<AvailableImage[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const { blobs } = await list({ prefix: 'uploads/', limit: 1000 });
    return blobs
      .filter(b => IMAGE_EXT.test(b.pathname))
      .map(b => ({
        src: b.url,
        name: b.pathname.replace(/^uploads\//, ''),
        source: 'blob' as const,
        pathname: b.pathname,
        size: b.size,
      }));
  } catch (err) {
    console.error('[imageLibrary] failed to list blobs:', err);
    return [];
  }
}

export async function listAllImages(): Promise<AvailableImage[]> {
  const [a, b] = await Promise.all([listBuiltin(), listUploaded()]);
  return [...a, ...b];
}
