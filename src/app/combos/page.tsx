import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import CombosCarousel from '@/components/CombosCarousel';
import CombosExplorer from '@/components/CombosExplorer';
import { dineInCombos, takeoutCombos, singleCombos } from '@/data/combos';

export const metadata: Metadata = { title: 'Combo Deals' };

export default function CombosPage() {
  return (
    <>
      <PageHeader title="Combo Deals" subtitle="Great value meals — dine in or take out" />
      <section className="section section-combos-hero">
        <div className="container">
          <CombosCarousel />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <CombosExplorer dineIn={dineInCombos} takeout={takeoutCombos} single={singleCombos} />
        </div>
      </section>
    </>
  );
}
