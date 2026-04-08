import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { cateringPackages } from '@/data/cateringPackages';

export const metadata: Metadata = { title: 'Catering' };

export default function CateringPage() {
  return (
    <>
      <PageHeader title="Catering Packages" subtitle="Let us make your event memorable" />
      <section className="section"><div className="container">
        <div style={{textAlign:'center',padding:'0 0 40px'}}>
          <Image src="/images/catering.jpg" alt="Catering" width={700} height={467} style={{maxWidth:700,borderRadius:12,boxShadow:'0 4px 20px rgba(0,0,0,0.12)'}} />
        </div>

        <h3 style={{textAlign:'center',color:'#fff',fontSize:'1.6rem',marginBottom:8}}>Our Packages</h3>
        <p style={{textAlign:'center',color:'var(--text-light)',marginBottom:32,fontSize:'0.95rem'}}>All prices are per person</p>

        <div className="catering-packages-grid">
          {cateringPackages.map(p => (
            <div key={p.id} id={p.id} className="catering-pkg-card">
              <div className="catering-pkg-header">
                <h4>{p.name}</h4>
                <div className="catering-pkg-meta">{p.items}</div>
                <div className="catering-pkg-price">{p.price}</div>
                <div className="catering-pkg-meta">per person</div>
                <div className="catering-pkg-min">{p.minPeople}</div>
              </div>
              <div className="catering-pkg-body">
                {p.sections.map((s, i) => (
                  <div key={i} className="catering-pkg-section">
                    <h5>{s.heading}</h5>
                    {s.note && <p className="catering-pkg-note">{s.note}</p>}
                    <ul>
                      {s.options.map((opt, j) => <li key={j}>{opt}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{maxWidth:800,margin:'40px auto 0'}}>
          <p style={{fontSize:'1.05rem',marginBottom:16}}>Our catering menu features generous portions of authentic Pakistani &amp; Indian meals. We offer customizable packages for groups of all sizes.</p>
          <ul style={{listStyle:'none',margin:'24px 0'}}>
            {['50% deposit required for all catering orders','Contact us at least one week in advance (two weeks for long weekends)','10% discount for cash payments','Delivery available with extra charge depending on address'].map((t,i) => (
              <li key={i} style={{padding:'10px 0 10px 24px',position:'relative',borderBottom:'1px dashed var(--border)'}}>
                <span style={{position:'absolute',left:0,color:'var(--red-bright)',fontWeight:700}}>&#10003;</span> {t}
              </li>
            ))}
          </ul>
          <div style={{background:'var(--light-bg)',padding:28,borderRadius:8,textAlign:'center',margin:'32px 0',borderLeft:'4px solid var(--red)'}}>
            <p style={{fontSize:'1.15rem',marginBottom:8}}><strong>For catering inquiries:</strong></p>
            <p style={{fontSize:'1.3rem'}}><a href="tel:4168826637" style={{color:'var(--red)',fontWeight:700}}>416-882-6637</a> &nbsp;|&nbsp; <a href="mailto:info@foodtime.ca" style={{color:'var(--red-bright)',fontWeight:700}}>info@foodtime.ca</a></p>
          </div>
          <div style={{textAlign:'center'}}><Link href="/catering/party-trays" className="btn">View Party Tray Pricing</Link></div>
        </div>
      </div></section>
    </>
  );
}
