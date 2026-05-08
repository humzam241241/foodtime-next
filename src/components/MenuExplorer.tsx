'use client';
import { useState } from 'react';
import { MenuCategoryData } from './MenuCategory';
import UnifiedMenuCategory from './UnifiedMenuCategory';
import { slugify } from '@/lib/slug';

const SHORT_LABELS: Record<string, string> = {
  'Appetizers / Snacks': 'Appetizers',
  'Vegetarian Dishes': 'Vegetarian',
  'Curry Dishes': 'Curry',
  'Rice Dishes': 'Rice',
  'Wraps': 'Wraps',
  'Sizzling B.B.Q (Tandoori Dishes)': 'B.B.Q',
  'Sea Food': 'Seafood',
  'Naan (Bread)': 'Naan',
  'Dessert & Sweets': 'Desserts',
  'Hot & Cold Beverages': 'Beverages',
  "Kid's Menu": 'Kids',
};

export default function MenuExplorer({
  dineIn, takeout,
}: { dineIn: MenuCategoryData[]; takeout: MenuCategoryData[] }) {
  const [active, setActive] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Menu' },
    ...dineIn.map(c => ({ id: slugify(c.name), label: SHORT_LABELS[c.name] ?? c.name })),
  ];

  const isVisible = (cat: MenuCategoryData) =>
    active === 'all' || slugify(cat.name) === active;

  return (
    <div className="menu-explorer">
      <div className="menu-filter-tabs" role="tablist" aria-label="Filter menu by category">
        {filters.map(f => (
          <button
            type="button"
            key={f.id}
            role="tab"
            aria-selected={active === f.id}
            className={`menu-filter-tab${active === f.id ? ' is-active' : ''}`}
            onClick={() => setActive(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {dineIn.map((cat, i) =>
        isVisible(cat) ? (
          <UnifiedMenuCategory key={i} dineIn={cat} takeout={takeout[i]} />
        ) : null
      )}
    </div>
  );
}
