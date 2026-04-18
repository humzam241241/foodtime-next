// Auto-populated from /public/images/gallery (g01..g57.webp)
// Split into three bands for homepage marquees + community strip.

export const galleryAll: string[] = Array.from({ length: 57 }, (_, i) =>
  `/images/gallery/g${String(i + 1).padStart(2, '0')}.webp`
);

// Three visually distinct rows — split by stride so adjacent images rarely
// share framing, even if the source doc groups them.
function pick(stride: number, offset: number, count: number) {
  const out: string[] = [];
  let idx = offset;
  while (out.length < count) {
    out.push(galleryAll[idx % galleryAll.length]);
    idx += stride;
  }
  return out;
}

export const marqueeTop = pick(3, 0, 18);     // left-moving
export const marqueeMiddle = pick(3, 1, 18);  // right-moving
export const marqueeBottom = pick(3, 2, 18);  // left-moving (slower)

// For the Community section — 12 warmest/group shots (fall back to full set).
export const communityStrip = pick(5, 4, 14);
