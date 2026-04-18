// ─── Food Time — central food-image manifest ──────────────────────────
// Source of truth for every food photo on the site. Derived from the
// labelled Pictures Doc provided by the owner.
//
// Folder structure under /public/images/gallery:
//   hero/          — homepage hero slides (3)
//   signatures/    — "Welcome From Our Kitchen" rotator (5)
//   daily/         — one image per day of specials (6, Tue–Sun)
//   categories/*   — per-menu-category carousels

const G = '/images/gallery';

export const heroImages = {
  biryani: `${G}/hero/01-biryani.webp`,
  tandoor: `${G}/hero/02-tandoor.webp`,
  curries: `${G}/hero/03-curries.webp`,
};

export const signatureImages = {
  chickenBiryani: `${G}/signatures/01-chicken-biryani.webp`,
  karahi:         `${G}/signatures/02-karahi-curry.webp`,
  bbq:            `${G}/signatures/03-bbq-tandoori.webp`,
  butterChicken:  `${G}/signatures/04-butter-chicken.webp`,
  nihariHaleem:   `${G}/signatures/05-nihari-haleem.webp`,
};

export const dailyImages: Record<string, string> = {
  Tuesday:   `${G}/daily/tuesday.webp`,
  Wednesday: `${G}/daily/wednesday.webp`,
  Thursday:  `${G}/daily/thursday.webp`,
  Friday:    `${G}/daily/friday.webp`,
  Saturday:  `${G}/daily/saturday.webp`,
  Sunday:    `${G}/daily/sunday.webp`,
};

// Menu category carousels — keys match the category labels in src/data/menu.ts
export const categoryImages: Record<string, string[]> = {
  'Appetizers / Snacks': [
    `${G}/categories/appetizers/1.webp`,
    `${G}/categories/appetizers/2.webp`,
    `${G}/categories/appetizers/3.webp`,
    `${G}/categories/appetizers/4.webp`,
  ],
  'Vegetarian Dishes': [
    `${G}/categories/vegetarian/1.webp`,
    `${G}/categories/vegetarian/2.webp`,
    `${G}/categories/vegetarian/3.webp`,
    `${G}/categories/vegetarian/4.webp`,
    `${G}/categories/vegetarian/5.webp`,
  ],
  'Curry Dishes': [
    `${G}/categories/curry/1.webp`,
    `${G}/categories/curry/2.webp`,
    `${G}/categories/curry/3.webp`,
    `${G}/categories/curry/4.webp`,
    `${G}/categories/curry/5.webp`,
    `${G}/categories/curry/6.webp`,
    `${G}/categories/curry/7.webp`,
  ],
  'Rice Dishes': [
    `${G}/categories/rice/1.webp`,
    `${G}/categories/rice/2.webp`,
    `${G}/categories/rice/3.webp`,
    `${G}/categories/rice/4.webp`,
    `${G}/categories/rice/5.webp`,
  ],
  'Sizzling B.B.Q (Tandoori Dishes)': [
    `${G}/categories/bbq/1.webp`,
    `${G}/categories/bbq/2.webp`,
    `${G}/categories/bbq/3.webp`,
    `${G}/categories/bbq/4.webp`,
    `${G}/categories/bbq/5.webp`,
    `${G}/categories/bbq/6.webp`,
  ],
  'Sea Food': [
    `${G}/categories/seafood/1.webp`,
    `${G}/categories/seafood/2.webp`,
    `${G}/categories/seafood/3.webp`,
    `${G}/categories/seafood/4.webp`,
  ],
  'Naan (Bread)': [
    `${G}/categories/naan/1.webp`,
    `${G}/categories/naan/2.webp`,
    `${G}/categories/naan/3.webp`,
    `${G}/categories/naan/4.webp`,
  ],
  'Dessert & Sweets': [
    `${G}/categories/dessert/1.webp`,
    `${G}/categories/dessert/2.webp`,
    `${G}/categories/dessert/3.webp`,
    `${G}/categories/dessert/4.webp`,
  ],
  'Hot & Cold Beverages': [
    `${G}/categories/beverages/1.webp`,
    `${G}/categories/beverages/2.webp`,
    `${G}/categories/beverages/3.webp`,
    `${G}/categories/beverages/4.webp`,
  ],
  // Wraps currently have no dedicated photos in the doc — reuse BBQ as closest match.
  'Wraps': [
    `${G}/categories/bbq/2.webp`,
    `${G}/categories/bbq/4.webp`,
  ],
};

export type GalleryItem = { src: string; category: string; label: string };

// Everything, flattened, for the masonry gallery page + homepage marquees.
export const allImages: GalleryItem[] = [
  { src: heroImages.biryani,              category: 'Hero',       label: 'Biryani That Brings You Back' },
  { src: heroImages.tandoor,              category: 'Hero',       label: 'Sizzling From The Tandoor' },
  { src: heroImages.curries,              category: 'Hero',       label: 'Rich, Slow-Simmered Curries' },
  { src: signatureImages.chickenBiryani,  category: 'Signature',  label: 'Chicken Biryani' },
  { src: signatureImages.karahi,          category: 'Signature',  label: 'Karahi & Curry' },
  { src: signatureImages.bbq,             category: 'Signature',  label: 'BBQ & Tandoori' },
  { src: signatureImages.butterChicken,   category: 'Signature',  label: 'Butter Chicken' },
  { src: signatureImages.nihariHaleem,    category: 'Signature',  label: 'Nihari & Haleem' },
  ...Object.entries(dailyImages).map(([day, src]) => ({ src, category: 'Daily', label: `${day} Special` })),
  ...Object.entries(categoryImages)
    .filter(([cat]) => cat !== 'Wraps')
    .flatMap(([cat, srcs]) =>
      srcs.map((src, i) => ({ src, category: cat, label: `${cat} ${i + 1}` }))
    ),
];

// Evenly-spaced picks for the homepage marquees — skip by stride so adjacent
// images rarely share framing.
function strideSample(offset: number, count: number) {
  const pool = allImages.map(i => i.src);
  const out: string[] = [];
  for (let i = 0; out.length < count; i++) {
    out.push(pool[(offset + i * 3) % pool.length]);
  }
  return out;
}

export const marqueeTop = strideSample(0, 18);
export const marqueeMiddle = strideSample(1, 18);
export const marqueeBottom = strideSample(2, 18);

export const communityStrip = strideSample(4, 14);
