import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import MenuCategory from '@/components/MenuCategory';
import { takeoutMenu } from '@/data/menu';

export const metadata: Metadata = { title: 'Takeout Menu' };

export default function TakeoutPage() {
  return (
    <>
      <PageHeader title="Take Out Menu" subtitle="Same great taste, ready to go" />
      <section className="section"><div className="container">
        {takeoutMenu.map((cat, i) => <MenuCategory key={i} category={cat} />)}
      </div></section>
    </>
  );
}
