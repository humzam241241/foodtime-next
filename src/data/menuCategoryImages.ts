// Category carousels for menu pages — now sourced from the labelled Pictures Doc.
// All mappings live in ./foodImages.ts — this file is kept as a thin wrapper so
// callers don't have to change their imports.
import { categoryImages } from './foodImages';

const fallback = categoryImages['Curry Dishes'];

export function getImagesForCategory(name: string): string[] {
  return categoryImages[name] ?? fallback;
}
