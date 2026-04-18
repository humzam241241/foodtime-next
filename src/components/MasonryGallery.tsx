'use client';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { GalleryItem } from '@/data/foodImages';

type Props = { items: GalleryItem[] };

export default function MasonryGallery({ items }: Props) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach(i => set.add(i.category));
    return ['All', ...Array.from(set)];
  }, [items]);

  const [active, setActive] = useState('All');

  const visible = active === 'All' ? items : items.filter(i => i.category === active);

  return (
    <>
      <div className="gallery-filters" role="tablist" aria-label="Gallery filters">
        {categories.map(c => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={active === c}
            className={`gallery-filter${active === c ? ' active' : ''}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="masonry">
        {visible.map((it, i) => (
          <div
            key={it.src + i}
            className="masonry-item"
            data-label={it.label}
            data-lightbox="gallery"
            data-alt={it.label}
          >
            <Image
              src={it.src}
              alt={it.label}
              width={600}
              height={800}
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1100px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>
    </>
  );
}
