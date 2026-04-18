/**
 * Default hero slides used when Vercel Blob config is not yet set up,
 * or when the admin hasn't chosen any images.
 *
 * Sources are from the owner-provided Pictures Doc (Slider #1 labels).
 */
import { heroImages } from './foodImages';

export type HeroSlide = {
  src: string;
  title: string;
  subtitle: string;
  cta?: { label: string; href: string };
};

export const defaultHeroSlides: HeroSlide[] = [
  {
    src: heroImages.biryani,
    title: 'Biryani That Brings You Back',
    subtitle: 'Aromatic basmati, premium cuts, slow-cooked the traditional way.',
    cta: { label: 'View Our Menu', href: '/menu/dine-in' },
  },
  {
    src: heroImages.tandoor,
    title: 'Sizzling From the Tandoor',
    subtitle: 'Chicken tikka, seekh kabab, bihari kabab, lamb chops.',
    cta: { label: 'BBQ Menu', href: '/menu/dine-in' },
  },
  {
    src: heroImages.curries,
    title: 'Rich, Slow-Simmered Curries',
    subtitle: 'Karahi, qorma, butter chicken — finished with fresh ginger and coriander.',
    cta: { label: 'Explore Curries', href: '/menu/dine-in' },
  },
];
