/**
 * Default hero slides used when Vercel Blob config is not yet set up,
 * or when the admin hasn't chosen any images.
 */
export type HeroSlide = {
  src: string;
  title: string;
  subtitle: string;
  cta?: { label: string; href: string };
};

export const defaultHeroSlides: HeroSlide[] = [
  {
    src: '/images/hero.jpg',
    title: 'Welcome to Food Time',
    subtitle: 'Authentic Halal Pakistani & Indian Cuisine in Pickering & Whitby',
    cta: { label: 'View Our Menu', href: '/menu/dine-in' },
  },
  {
    src: '/images/food1.jpg',
    title: 'Biryani That Brings You Back',
    subtitle: 'Aromatic basmati, premium cuts, slow-cooked the traditional way.',
    cta: { label: 'Order Now', href: '/menu/takeout' },
  },
  {
    src: '/images/food3.webp',
    title: 'Sizzling From the Tandoor',
    subtitle: 'Chicken tikka, seekh kabab, bihari kabab, lamb chops.',
    cta: { label: 'BBQ Menu', href: '/menu/dine-in' },
  },
  {
    src: '/images/food2.webp',
    title: 'Rich, Slow-Simmered Curries',
    subtitle: 'Karahi, qorma, butter chicken — finished with fresh ginger and coriander.',
    cta: { label: 'Explore Curries', href: '/menu/dine-in' },
  },
];
