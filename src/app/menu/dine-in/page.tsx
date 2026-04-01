import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import MenuCategory from '@/components/MenuCategory';
import { dineInMenu } from '@/data/menu';

export const metadata: Metadata = { title: 'Dine In Menu' };

export default function DineInPage() {
  return (
    <>
      <PageHeader title="Dine In Menu" subtitle="Authentic Pakistani & Indian cuisine served fresh" />
      <section className="section"><div className="container">
        {dineInMenu.map((cat, i) => <MenuCategory key={i} category={cat} />)}
      </div></section>
    </>
  );
}
