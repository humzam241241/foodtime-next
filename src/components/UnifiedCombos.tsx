'use client';
import type { Combo } from '@/data/combos';
import { slugify } from '@/lib/slug';

type Props = {
  active: 'dinein' | 'takeout';
  dineIn: Combo[];
  takeout: Combo[];
};

const specialRe = /\(\s*(\w+)\s+Special\s+(\d+)\s*%\s*OFF\s*\)/i;

function parseSpecial(name: string) {
  const m = name.match(specialRe);
  if (!m) return { displayName: name, badge: null as null | { day: string; pct: string } };
  return {
    displayName: name.replace(specialRe, '').trim(),
    badge: { day: m[1].toUpperCase(), pct: m[2] },
  };
}

function computeSavings(dineIn: string, takeout: string): string | null {
  const d = parseFloat(dineIn.replace(/[^\d.]/g, ''));
  const t = parseFloat(takeout.replace(/[^\d.]/g, ''));
  if (Number.isNaN(d) || Number.isNaN(t) || t >= d) return null;
  const diff = d - t;
  return diff >= 1 ? `$${diff.toFixed(diff % 1 === 0 ? 0 : 2)}` : null;
}

export default function UnifiedCombos({ active, dineIn, takeout }: Props) {
  return (
    <div className={`unified-combos active-${active}`}>
      <div className="combo-grid">
        {dineIn.map((c, i) => {
          const to = takeout[i];
          const { displayName, badge } = parseSpecial(c.name);
          const savings = to ? computeSavings(c.price, to.price) : null;
          const anchorId = slugify(displayName);
          return (
            <div key={i} id={anchorId} className="combo-card unified-combo-card">
              {badge && (
                <span className="combo-badge-special" aria-label={`${badge.day} special ${badge.pct}% off`}>
                  <strong>{badge.day}</strong> SPECIAL
                </span>
              )}
              <h3>{displayName}</h3>
              <div className="combo-prices">
                <span className="price-dinein">{c.price}</span>
                <span className="price-takeout">
                  {to?.price ?? c.price}
                  {savings && <span className="combo-badge-save">Save {savings}</span>}
                </span>
              </div>
              <ul>{c.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
