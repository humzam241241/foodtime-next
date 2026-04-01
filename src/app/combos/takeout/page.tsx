import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import MenuItem from '@/components/MenuItem';
import { takeoutCombos, singleCombos } from '@/data/combos';

export const metadata: Metadata = { title: 'Takeout Combo Deals' };

export default function TakeoutCombosPage() {
  return (
    <>
      <PageHeader title="Take-out Combo Deals" subtitle="Great value meals ready to go" />
      <section className="section"><div className="container">
        <div className="combo-grid">
          {takeoutCombos.map((c, i) => (
            <div key={i} className="combo-card">
              <h3>{c.name}</h3>
              <div className="combo-price">{c.price}</div>
              <ul>{c.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="menu-category" style={{marginTop:48}}>
          <h3>Combo For 1</h3>
          {singleCombos.map((c, i) => <MenuItem key={i} item={c} />)}
        </div>
      </div></section>
    </>
  );
}
