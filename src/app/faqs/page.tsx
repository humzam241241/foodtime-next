import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import FaqAccordion from '@/components/FaqAccordion';
import { faqs } from '@/data/faqs';

export const metadata: Metadata = { title: "FAQ's" };

export default function FaqsPage() {
  return (
    <>
      <PageHeader title="Frequently Asked Questions" />
      <section className="section"><div className="container" style={{maxWidth:800}}>
        <FaqAccordion items={faqs} />
        <p style={{marginTop:32,textAlign:'center',color:'var(--text-light)',lineHeight:1.8}}>
          Have other questions? Call us:<br />
          <strong>Pickering:</strong> <a href="tel:9054280310">905-428-0310</a> | <strong>Whitby:</strong> <a href="tel:2892400786">289-240-0786</a><br />
          <strong>Catering:</strong> Hafeez <a href="tel:4168826637">416-882-6637</a> (Pickering) or Hares <a href="tel:6473213367">647-321-3367</a> (Whitby)
        </p>
      </div></section>
    </>
  );
}
