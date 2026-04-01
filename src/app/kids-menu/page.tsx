import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import MenuCategory from '@/components/MenuCategory';

export const metadata: Metadata = { title: "Kid's Menu" };

const kidsMenu = [
  { name: "Kid's Special (Take Out)", items: [
    { name: 'Chicken Nuggets with French Fries', price: '$6.99' },
    { name: 'Malai Chicken Tikka (4/5 pcs) with French Fries', price: '$9.99' },
    { name: 'Kids French Fries', price: '$3.99' },
  ]},
  { name: "Kid's Special (Dine In)", items: [
    { name: 'Chicken Nuggets with French Fries', price: '$8.99' },
    { name: 'Malai Chicken Tikka (4/5 pcs) with French Fries', price: '$8.99' },
    { name: 'Kids French Fries', price: '$3.99' },
  ]},
];

export default function KidsMenuPage() {
  return (
    <>
      <PageHeader title="Kid's Menu" subtitle="Special treats for our little guests" />
      <section className="section"><div className="container">
        {kidsMenu.map((cat, i) => <MenuCategory key={i} category={cat} />)}
      </div></section>
    </>
  );
}
