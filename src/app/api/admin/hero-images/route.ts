import { NextResponse } from 'next/server';
import { readHeroSlides, writeHeroSlides, blobConfigured } from '@/lib/heroImagesStore';
import { isAdmin } from '@/lib/adminGuard';
import type { HeroSlide } from '@/data/defaultHeroImages';

export const runtime = 'nodejs';

/**
 * Reject URLs that could execute script when clicked via a <Link>.
 * Accepts: /relative, #hash, https://, http://, mailto:, tel:.
 * Rejects:  javascript:, data:, vbscript:, file:, protocol-relative (//...).
 */
function isSafeHref(href: string): boolean {
  const h = href.trim();
  if (!h) return false;
  if (h.startsWith('//')) return false;
  if (h.startsWith('/') || h.startsWith('#')) return true;
  return /^(https?|mailto|tel):/i.test(h);
}

/**
 * Reject src values that are not plain relative paths or https URLs.
 * Images are rendered via <Image src={s.src}>; blocking javascript:/data:
 * keeps the admin surface from introducing script contexts.
 */
function isSafeImageSrc(src: string): boolean {
  const s = src.trim();
  if (!s) return false;
  if (s.startsWith('//')) return false;
  if (s.startsWith('/')) return true;
  return /^https:\/\//i.test(s);
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const { slides, source } = await readHeroSlides();
  return NextResponse.json({ ok: true, slides, source, blobConfigured: blobConfigured() });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: { slides?: unknown };
  try {
    body = (await req.json()) as { slides?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  if (!Array.isArray(body.slides)) {
    return NextResponse.json({ ok: false, error: 'Expected { slides: [...] }' }, { status: 400 });
  }

  // Sanitize and validate each slide
  const cleaned: HeroSlide[] = [];
  for (const raw of body.slides as unknown[]) {
    if (typeof raw !== 'object' || raw === null) continue;
    const s = raw as Record<string, unknown>;
    const src = typeof s.src === 'string' ? s.src.trim() : '';
    const title = typeof s.title === 'string' ? s.title.trim().slice(0, 200) : '';
    const subtitle = typeof s.subtitle === 'string' ? s.subtitle.trim().slice(0, 400) : '';
    if (!src || !title) continue;
    if (!isSafeImageSrc(src)) continue;

    const slide: HeroSlide = { src, title, subtitle };
    if (typeof s.cta === 'object' && s.cta !== null) {
      const cta = s.cta as Record<string, unknown>;
      const label = typeof cta.label === 'string' ? cta.label.trim().slice(0, 80) : '';
      const href = typeof cta.href === 'string' ? cta.href.trim().slice(0, 500) : '';
      if (label && href && isSafeHref(href)) slide.cta = { label, href };
    }
    cleaned.push(slide);
  }

  if (cleaned.length === 0) {
    return NextResponse.json({ ok: false, error: 'At least one valid slide is required' }, { status: 400 });
  }

  try {
    await writeHeroSlides(cleaned);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Write failed';
    console.error('[hero-images POST] write failed:', err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true, slides: cleaned });
}
