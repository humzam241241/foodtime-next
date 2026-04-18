import Image from 'next/image';
import Link from 'next/link';
import AnimatedCounter from './AnimatedCounter';
import { signatureImages, heroImages } from '@/data/foodImages';
import { siteConfig } from '@/data/siteConfig';

export default function BentoGrid() {
  return (
    <section className="section">
      <div className="container">
        <h2>Why <span className="accent">Food Time</span></h2>
        <p className="subtitle">Halal-certified, slow-cooked, and served with heart — here&apos;s the short of it.</p>

        <div className="bento">
          {/* Big feature tile — signature dish */}
          <Link href="/menu/dine-in" className="bento-tile bento-feature tilt-auto" data-bento="feature">
            <Image
              src={signatureImages.chickenBiryani}
              alt="Chicken Biryani"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="bento-img"
            />
            <div className="bento-feature-overlay">
              <span className="bento-eyebrow">Signature Dish</span>
              <h3>Chicken Biryani</h3>
              <p>Aromatic basmati, saffron, and slow-marinated cuts — the dish our guests come back for.</p>
              <span className="bento-cta">See the menu →</span>
            </div>
          </Link>

          {/* Halal badge */}
          <div className="bento-tile bento-halal tilt-auto" data-bento="halal">
            <div className="bento-halal-ring">
              <span>100%</span>
            </div>
            <h4>Halal Certified</h4>
            <p>Every dish, every day.</p>
          </div>

          {/* Years counter */}
          <div className="bento-tile bento-stat tilt-auto" data-bento="years">
            <span className="bento-stat-num"><AnimatedCounter to={15} suffix="+" /></span>
            <span className="bento-stat-label">Years Serving Durham</span>
          </div>

          {/* Two locations */}
          <div className="bento-tile bento-locations tilt-auto" data-bento="locations">
            <h4>Two Locations</h4>
            <ul>
              <li>
                <strong>{siteConfig.locations.pickering.name}</strong>
                <span>{siteConfig.locations.pickering.address}</span>
                <span>{siteConfig.locations.pickering.addressLine2}</span>
              </li>
              <li>
                <strong>{siteConfig.locations.whitby.name}</strong>
                <span>{siteConfig.locations.whitby.address}</span>
                <span>{siteConfig.locations.whitby.addressLine2}</span>
              </li>
            </ul>
            <Link href="/contact" className="bento-cta">Get directions →</Link>
          </div>

          {/* Tandoor photo — wide */}
          <Link href="/menu/dine-in" className="bento-tile bento-photo tilt-auto" data-bento="tandoor">
            <Image
              src={heroImages.tandoor}
              alt="Sizzling from the tandoor"
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              className="bento-img"
            />
            <span className="bento-photo-label">From the Tandoor</span>
          </Link>

          {/* Weekend breakfast — real highlight, pulled from site data */}
          <Link href="/specials/daily" className="bento-tile bento-weekend tilt-auto" data-bento="weekend">
            <span className="bento-eyebrow">Saturdays &amp; Sundays · 10 am – 1 pm</span>
            <h4>Weekend Breakfast Special</h4>
            <p>Halwa, puri, channa and aloo sabzi — only on the weekend.</p>
            <span className="bento-cta">See the specials →</span>
          </Link>

          {/* Catering CTA */}
          <Link href="/catering" className="bento-tile bento-catering tilt-auto" data-bento="catering">
            <div>
              <span className="bento-eyebrow">We Cater</span>
              <h4>Weddings · Corporate · Community</h4>
              <p>Packages start at $14.99 per person.</p>
            </div>
            <span className="bento-cta">View packages →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
