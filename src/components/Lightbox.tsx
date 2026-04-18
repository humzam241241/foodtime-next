'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Any <img> or <a> that carries data-lightbox="group" is eligible.
// Images sharing the same group become a navigable set.

type Item = { src: string; alt: string; group: string };

export default function Lightbox() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-lightbox]');
      if (!el) return;
      e.preventDefault();
      const group = el.getAttribute('data-lightbox') || 'default';
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(`[data-lightbox="${group}"]`));
      const collected: Item[] = nodes.map((n) => {
        const img = n.tagName === 'IMG' ? (n as HTMLImageElement) : n.querySelector('img');
        const src = img?.currentSrc || img?.src || n.getAttribute('data-src') || '';
        const alt = img?.alt || n.getAttribute('data-alt') || '';
        return { src, alt, group };
      }).filter(it => it.src);
      if (collected.length === 0) return;
      const start = nodes.indexOf(el);
      setItems(collected);
      setIndex(Math.max(0, start));
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % items.length);
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + items.length) % items.length);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, items.length]);

  if (!open || items.length === 0) return null;

  const it = items[index];
  const prev = () => setIndex(i => (i - 1 + items.length) % items.length);
  const next = () => setIndex(i => (i + 1) % items.length);

  return (
    <div
      className="lightbox"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const s = touchStart.current; if (s == null) return;
        const dx = e.changedTouches[0].clientX - s;
        if (Math.abs(dx) > 60) (dx > 0 ? prev() : next());
        touchStart.current = null;
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <button className="lightbox-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
      {items.length > 1 && (
        <>
          <button className="lightbox-arrow prev" onClick={prev} aria-label="Previous">‹</button>
          <button className="lightbox-arrow next" onClick={next} aria-label="Next">›</button>
          <div className="lightbox-counter">{index + 1} / {items.length}</div>
        </>
      )}
      <div className="lightbox-stage" key={it.src}>
        <Image
          src={it.src}
          alt={it.alt}
          width={1600}
          height={1600}
          className="lightbox-img"
          priority
          sizes="90vw"
        />
        {it.alt && <div className="lightbox-caption">{it.alt}</div>}
      </div>
    </div>
  );
}
