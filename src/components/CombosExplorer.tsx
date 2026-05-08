'use client';
import { useMemo, useState } from 'react';
import type { Combo, ComboSingle } from '@/data/combos';
import UnifiedCombos from './UnifiedCombos';

type Filter = 'all' | 'single' | 'couples' | 'for23' | 'family' | 'for56' | 'bbq';

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All Combos' },
  { id: 'single', label: 'For 1' },
  { id: 'couples', label: 'For 2' },
  { id: 'for23', label: 'For 2/3' },
  { id: 'family', label: 'Family (4)' },
  { id: 'for56', label: 'For 5/6' },
  { id: 'bbq', label: 'BBQ' },
];

function matchesFilter(name: string, filter: Filter): boolean {
  if (filter === 'all') return true;
  if (filter === 'family') return /FOR 4/i.test(name);
  if (filter === 'for23') return /FOR 2[-/]3/i.test(name);
  if (filter === 'for56') return /FOR 5[-/]6/i.test(name);
  // "FOR 2" but not "FOR 2-3" / "FOR 2/3"
  if (filter === 'couples') return /FOR 2(?![-/0-9])/i.test(name);
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
        <section className="combo-list">
          {filter === 'all' && filteredDineIn.length > 0 && (
            <h4 className="combo-list__heading">Combo For 1</h4>
          )}
          <p className="combo-list__note">Same Price · Dine-In or Takeout</p>
          <ul className="combo-list__items">
            {single.map((c, i) => (
              <li key={i} className="combo-list__row">
                <div className="combo-list__line">
                  <span className="combo-list__name">{c.name}</span>
                  <span className="combo-list__leader" aria-hidden="true" />
                  <span className="combo-list__price">{c.price}</span>
                </div>
                {c.description && <p className="combo-list__desc">{c.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {filter !== 'all' && filter !== 'single' && filteredDineIn.length === 0 && (
        <p className="combos-empty">No combos match this filter yet.</p>
      )}
    </div>
  );
}
