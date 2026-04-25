import { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { cateringPackages } from '@/data/cateringPackages';
import { signatureImages, heroImages, categoryImages } from '@/data/foodImages';
import ScrollStory, { type Step } from '@/components/ScrollStory';

const cateringStory: Step[] = [
  {
    num: '01',
    title: 'You tell us the vision',
    body: 'Wedding, corporate lunch, community iftaar — we start with a quick call to understand head-count, dietary notes, and service style. No quote forms, no email ping-pong.',
    image: signatureImages.karahi,
    alt: 'Karahi & curry',
  },
  {
    num: '02',
    title: 'We shop and prep that morning',
    body: 'Every catering order is cooked the day of service. Meats are marinated overnight; rice is hand-washed and soaked before the biryani is layered.',
    image: heroImages.tandoor,
    alt: 'Tandoor preparation',
  },
  {
    num: '03',
    title: 'Slow-cooked, not reheated',
    body: 'Karahi and qorma simmer for hours on low flame so the spices open up fully. Nihari is started the night before — that depth of flavour is not a microwave job.',
    image: signatureImages.nihariHaleem,
    alt: 'Nihari and haleem',
  },
  {
    num: '04',
    title: 'Delivered hot in proper trays',
    body: 'Insulated trays keep everything at serving temperature. We set up chafers and warmers on-site for dinners over 50 guests. You greet your guests — we handle the rest.',
    image: categoryImages['Rice Dishes'][0],
    alt: 'Catering-size rice trays',
  },
];

export const metadata: Metadata = { title: 'Catering' };

export default function CateringPage() {
  return (
    <>
      <PageHeader title="Catering Packages" subtitle="Let us make your event memorable" />
      <section className="section"><div className="container">
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

          {/* Wedding CTA card */}
          <div className="catering-pkg-card wedding-cta-card">
            <div className="wedding-cta-inner">
              <div className="wedding-cta-ornament">&#10053;</div>
              <h4 className="wedding-cta-title">Exclusive Wedding Packages</h4>
              <p className="wedding-cta-min">Available from minimum 50 people</p>
              <div className="wedding-cta-divider" />
              <p className="wedding-cta-text">For more information contact</p>
              <p className="wedding-cta-name">Hafeez <span style={{fontWeight:400,fontSize:'0.85em'}}>(Pickering)</span></p>
              <a href="tel:4168826637" className="wedding-cta-phone">416-882-6637</a>
              <p className="wedding-cta-text" style={{marginTop:14}}>or</p>
              <p className="wedding-cta-name">Hares <span style={{fontWeight:400,fontSize:'0.85em'}}>(Whitby)</span></p>
              <a href="tel:6473213367" className="wedding-cta-phone">647-321-3367</a>
              <div className="wedding-cta-ornament">&#10053;</div>
            </div>
          </div>
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
            <p style={{fontSize:'1.15rem',marginBottom:6}}>
              <strong>Hafeez</strong> &mdash; <a href="tel:4168826637" style={{color:'var(--red)',fontWeight:700}}>416-882-6637</a> <span style={{color:'var(--text-light)'}}>(Pickering)</span>
            </p>
            <p style={{fontSize:'1.15rem',marginBottom:14}}>
              <strong>Hares</strong> &mdash; <a href="tel:6473213367" style={{color:'var(--red)',fontWeight:700}}>647-321-3367</a> <span style={{color:'var(--text-light)'}}>(Whitby)</span>
            </p>
            <p style={{fontSize:'1.05rem'}}><a href="mailto:info@foodtime.ca" style={{color:'var(--red-bright)',fontWeight:700}}>info@foodtime.ca</a></p>
          </div>
          <div style={{textAlign:'center'}}><Link href="/catering/party-trays" className="btn">View Party Tray Pricing</Link></div>
        </div>
      </div></section>

      {/* Sticky-scroll story: how a catering order comes to life */}
      <section className="section section-alt">
        <div className="container">
          <h2 style={{textAlign:'center'}}>From Our Kitchen <span className="accent">to Your Table</span></h2>
          <p className="subtitle" style={{textAlign:'center'}}>The four steps behind every catering order.</p>
          <ScrollStory steps={cateringStory} />
        </div>
      </section>
    </>
  );
}
