// Image sets per menu category — same for dine-in and takeout.
// Replace placeholder paths with real category photos when available.

const menuCategoryImages: Record<string, string[]> = {
  'Appetizers / Snacks': ['/images/food1.jpg', '/images/food2.webp'],
  'Vegetarian Dishes': ['/images/food4.webp', '/images/food2.webp'],
  'Curry Dishes': ['/images/food2.webp', '/images/food3.webp', '/images/food5.jpg'],
  'Rice Dishes': ['/images/food1.jpg', '/images/food4.webp'],
  'Wraps': ['/images/food3.webp', '/images/food5.jpg'],
  'Sizzling B.B.Q (Tandoori Dishes)': ['/images/food3.webp', '/images/food5.jpg', '/images/food1.jpg'],
  'Sea Food': ['/images/food4.webp', '/images/food2.webp'],
  'Naan (Bread)': ['/images/food1.jpg', '/images/food3.webp'],
  'Dessert & Sweets': ['/images/food4.webp', '/images/food5.jpg'],
  'Hot & Cold Beverages': ['/images/food2.webp', '/images/food1.jpg'],
};

const fallback = ['/images/food1.jpg', '/images/food2.webp'];

export function getImagesForCategory(name: string): string[] {
  return menuCategoryImages[name] ?? fallback;
}
