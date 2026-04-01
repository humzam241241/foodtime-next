import { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = { title: 'Promos' };

export default function PromosPage() {
  return (
    <>
      <PageHeader title="Promos & Special Offers" subtitle="Check out our latest deals" />
      <section className="section"><div className="container">
        <div className="card-grid">
          {[1,2,3,4,5,6].map(n => (
            <div key={n} className="card">
              <Image src={'/images/promo'+n+'.webp'} alt={'Special Offer '+n} width={640} height={400} className="card-img" style={{width:'100%',objectFit:'cover'}} />
              <div className="card-body"><h3>Special Offer</h3></div>
            </div>
          ))}
        </div>
      </div></section>
    </>
  );
}
