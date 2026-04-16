'use client';
import { useMemo, useState } from 'react';
import type { Combo, ComboSingle } from '@/data/combos';
import UnifiedCombos from './UnifiedCombos';

type Filter = 'all' | 'family' | 'couples' | 'bbq' | 'single';

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All Combos' },
  { id: 'family', label: 'Family (4)' },
  { id: 'couples', label: 'For 2' },
  { id: 'bbq', label: 'BBQ' },
  { id: 'single', label: 'For 1' },
];

function matchesFilter(name: string, filter: Filter): boolean {
  if (filter === 'all') return true;
  if (filter === 'family') return /FOR 4/i.test(name);
  if (filter === 'couples') return /FOR 2/i.test(name);
  if (filter === 'bbq') return /BBQ/i.test(name);
  return false;
}

export default function CombosExplorer({
  dineIn, takeout, single,
}: {
  dineIn: Combo[];
  takeout: Combo[];
  single: ComboSingle[];
}) {
  const [active, setActive] = useState<'dinein' | 'takeout'>('dinein');
  const [filter, setFilter] = useState<Filter>('all');

  const { filteredDineIn, filteredTakeout } = useMemo(() => {
    if (filter === 'single') return { filteredDineIn: [], filteredTakeout: [] };
    const keep: number[] = [];
    dineIn.forEach((c, i) => { if (matchesFilter(c.name, filter)) keep.push(i); });
    return {
      filteredDineIn: keep.map(i => dineIn[i]),
      filteredTakeout: keep.map(i => takeout[i]),
    };
  }, [dineIn, takeout, filter]);

  const showSingle = filter === 'all' || filter === 'single';
  const showToggle = filter !== 'single';

  return (
    <div className="combos-explorer">
      <div className="combo-filter-tabs" role="tablist" aria-label="Filter combos by group size">
        {filters.map(f => (
          <button
            type="button"
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            className={`combo-filter-tab${filter === f.id ? ' is-active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {showToggle && (
        <div className="heading-price-labels combo-toggle" role="tablist" aria-label="Pricing mode">
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
      )}

      {filteredDineIn.length > 0 && (
        <UnifiedCombos key={`family-${filter}`} active={active} dineIn={filteredDineIn} takeout={filteredTakeout} />
      )}

      {showSingle && single.length > 0 && (
        <div className="single-combos-wrap">
          {filter === 'all' && filteredDineIn.length > 0 && (
            <h4 className="combos-subheading">Combo For 1</h4>
          )}
          <div className="combo-grid single-combos-grid" key={`single-${filter}`}>
            {single.map((c, i) => (
              <div key={i} className="combo-card unified-combo-card single-combo-card">
                <h3>{c.name}</h3>
                {c.description && <p className="single-combo-desc">{c.description}</p>}
                <div className="combo-prices">
                  <span className="single-combo-price">{c.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filter !== 'all' && filter !== 'single' && filteredDineIn.length === 0 && (
        <p className="combos-empty">No combos match this filter yet.</p>
      )}
    </div>
  );
}
