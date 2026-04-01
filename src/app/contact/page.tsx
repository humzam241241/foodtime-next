import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/data/siteConfig';
const c = siteConfig;

export const metadata: Metadata = { title: 'Contact Us' };

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" />
      <section className="section"><div className="container">
        <div className="contact-grid">
          <div>
            <h2 style={{textAlign:'left',marginBottom:24}}>Send Us a Message</h2>
            <ContactForm />
          </div>
          <div>
            <h2 style={{textAlign:'left',marginBottom:24}}>Our Locations</h2>
            <div className="locations-grid" style={{gridTemplateColumns:'1fr'}}>
              <div className="location-card">
                <h3>Pickering</h3>
                <p>{c.locations.pickering.address}<br />{c.locations.pickering.addressLine2}</p>
                <p style={{marginTop:8}}><strong>Phone:</strong> <a href={'tel:'+c.locations.pickering.phoneTel}>{c.locations.pickering.phone}</a></p>
              </div>
              <div className="location-card">
                <h3>Whitby</h3>
                <p>{c.locations.whitby.address}<br />{c.locations.whitby.addressLine2}</p>
                <p style={{marginTop:8}}><strong>Phone:</strong> <a href={'tel:'+c.locations.whitby.phoneTel}>{c.locations.whitby.phone}</a></p>
              </div>
            </div>
            <div style={{marginTop:24,padding:20,background:'var(--light-bg)',borderRadius:8}}>
              <p><strong>Catering Only:</strong> <a href={'tel:'+c.catering.phoneTel}>{c.catering.phone}</a></p>
              <p><strong>Email:</strong> <a href={'mailto:'+c.email}>{c.email}</a></p>
            </div>
          </div>
        </div>
      </div></section>
    </>
  );
}
