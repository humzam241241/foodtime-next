import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import MenuExplorer from '@/components/MenuExplorer';
import { dineInMenu, takeoutMenu } from '@/data/menu';

export const metadata: Metadata = { title: 'Menu' };

export default function MenuPage() {
  return (
    <>
      <PageHeader title="Our Menu" subtitle="Authentic Pakistani & Indian cuisine — dine in or take out" />
      <section className="section"><div className="container">
        <MenuExplorer dineIn={dineInMenu} takeout={takeoutMenu} />
      </div></section>
    </>
  );
}
