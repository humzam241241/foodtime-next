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
        <section className="solo-combos">
          {filter === 'all' && filteredDineIn.length > 0 && (
            <header className="solo-combos__header">
              <span className="solo-combos__rule" aria-hidden="true" />
              <h4 className="solo-combos__heading">For One <span className="solo-combos__amp">·</span> à la carte</h4>
              <span className="solo-combos__rule" aria-hidden="true" />
            </header>
          )}
          <p className="solo-combos__note">One price <span aria-hidden="true">·</span> dine-in or takeout</p>
          <ol className="solo-combos__grid combo-grid" key={`single-${filter}`}>
            {single.map((c, i) => (
              <li key={i} className="solo-combo">
                <div className="solo-combo__seal" aria-hidden="true">
                  <span className="solo-combo__num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="solo-combo__body">
                  <h3 className="solo-combo__name">{c.name}</h3>
                  {c.description && <p className="solo-combo__desc">{c.description}</p>}
                </div>
                <div className="solo-combo__leader" aria-hidden="true" />
                <div className="solo-combo__pricing">
                  <span className="solo-combo__price-label">For One</span>
                  <span className="solo-combo__price">{c.price}</span>
                </div>
                <span className="solo-combo__corner" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </section>
      )}

      {filter !== 'all' && filter !== 'single' && filteredDineIn.length === 0 && (
        <p className="combos-empty">No combos match this filter yet.</p>
      )}
    </div>
  );
}
