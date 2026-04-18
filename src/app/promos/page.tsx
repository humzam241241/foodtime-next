import { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { signatureImages } from '@/data/foodImages';

export const metadata: Metadata = { title: 'Promos' };

const promos = [
  { image: signatureImages.chickenBiryani, title: 'Chicken Biryani Special' },
  { image: signatureImages.butterChicken,  title: 'Butter Chicken Special' },
  { image: signatureImages.bbq,            title: 'BBQ Platter Special' },
];

export default function PromosPage() {
  return (
    <>
      <PageHeader title="Promos & Special Offers" subtitle="Check out our latest deals" />
      <section className="section"><div className="container">
        <div className="card-grid promos-grid">
          {promos.map((p, i) => (
            <div key={i} className="card">
              <Image src={p.image} alt={p.title} width={640} height={400} className="card-img" style={{width:'100%',objectFit:'contain',background:'#0a0a0a'}} />
              <div className="card-body"><h3>{p.title}</h3></div>
            </div>
          ))}
        </div>
      </div></section>
    </>
  );
}
