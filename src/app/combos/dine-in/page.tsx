import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import MenuItem from '@/components/MenuItem';
import { dineInCombos, singleCombos } from '@/data/combos';

export const metadata: Metadata = { title: 'Dine-In Combo Deals' };

export default function DineInCombosPage() {
  return (
    <>
      <PageHeader title="Dine-In Combo Deals" subtitle="Great value meals for every appetite" />
      <section className="section"><div className="container">
        <div className="combo-grid">
          {dineInCombos.map((c, i) => (
            <div key={i} className="combo-card">
              <h3>{c.name}</h3>
              <div className="combo-price">{c.price}</div>
              <ul>{c.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="menu-category" style={{marginTop:48}}>
          <h3>Dine-In Combo For 1</h3>
          {singleCombos.map((c, i) => <MenuItem key={i} item={c} />)}
        </div>
      </div></section>
    </>
  );
}
