import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import UnifiedMenuCategory from '@/components/UnifiedMenuCategory';
import { dineInMenu, takeoutMenu } from '@/data/menu';

export const metadata: Metadata = { title: 'Menu' };

export default function MenuPage() {
  return (
    <>
      <PageHeader title="Our Menu" subtitle="Authentic Pakistani & Indian cuisine — dine in or take out" />
      <section className="section"><div className="container">
        {dineInMenu.map((cat, i) => (
          <UnifiedMenuCategory key={i} dineIn={cat} takeout={takeoutMenu[i]} />
        ))}
      </div></section>
    </>
  );
}
