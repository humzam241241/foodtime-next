'use client';
import { useState } from 'react';
import type { Combo } from '@/data/combos';

export default function UnifiedCombos({ dineIn, takeout }: { dineIn: Combo[]; takeout: Combo[] }) {
  const [active, setActive] = useState<'dinein' | 'takeout'>('dinein');
  return (
    <div className={`unified-combos active-${active}`}>
      <div className="heading-price-labels combo-toggle">
        <button
          type="button"
          className={`label-dinein${active === 'dinein' ? ' is-active' : ''}`}
          onClick={() => setActive('dinein')}
        >
          Dine-In
        </button>
        <button
          type="button"
          className={`label-takeout${active === 'takeout' ? ' is-active' : ''}`}
          onClick={() => setActive('takeout')}
        >
          Takeout
        </button>
      </div>
      <div className="combo-grid">
        {dineIn.map((c, i) => {
          const to = takeout[i];
          return (
            <div key={i} className="combo-card unified-combo-card">
              <h3>{c.name}</h3>
              <div className="combo-prices">
                <span className="price-dinein">{c.price}</span>
                <span className="price-takeout">{to?.price ?? c.price}</span>
              </div>
              <ul>{c.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
