import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import MenuItem from '@/components/MenuItem';
import UnifiedCombos from '@/components/UnifiedCombos';
import { dineInCombos, takeoutCombos, singleCombos } from '@/data/combos';

export const metadata: Metadata = { title: 'Combo Deals' };

export default function CombosPage() {
  return (
    <>
      <PageHeader title="Combo Deals" subtitle="Great value meals — dine in or take out" />
      <section className="section"><div className="container">
        <UnifiedCombos dineIn={dineInCombos} takeout={takeoutCombos} />

        <div className="menu-category" style={{marginTop:48}}>
          <h3>Combo For 1</h3>
          {singleCombos.map((c, i) => (
            <MenuItem key={i} item={c} />
          ))}
        </div>
      </div></section>
    </>
  );
}
