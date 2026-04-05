import { NextResponse } from 'next/server';
import { readHeroSlides, writeHeroSlides, blobConfigured } from '@/lib/heroImagesStore';
import { isAdmin } from '@/lib/adminGuard';
import type { HeroSlide } from '@/data/defaultHeroImages';

export const runtime = 'nodejs';

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
    const title = typeof s.title === 'string' ? s.title.trim() : '';
    const subtitle = typeof s.subtitle === 'string' ? s.subtitle.trim() : '';
    if (!src || !title) continue;

    const slide: HeroSlide = { src, title, subtitle };
    if (typeof s.cta === 'object' && s.cta !== null) {
      const cta = s.cta as Record<string, unknown>;
      const label = typeof cta.label === 'string' ? cta.label.trim() : '';
      const href = typeof cta.href === 'string' ? cta.href.trim() : '';
      if (label && href) slide.cta = { label, href };
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
