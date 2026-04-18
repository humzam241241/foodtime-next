import Image from 'next/image';
import Link from 'next/link';
import AnimatedCounter from './AnimatedCounter';
import { signatureImages, heroImages } from '@/data/foodImages';

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
              <li><strong>Pickering</strong><span>1525 Pickering Pkwy</span></li>
              <li><strong>Whitby</strong><span>1610 Dundas St E</span></li>
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

          {/* Quote / testimonial */}
          <div className="bento-tile bento-quote tilt-auto" data-bento="quote">
            <svg className="bento-quote-mark" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M6 10a6 6 0 0 0-6 6v2h6v-2H3a3 3 0 0 1 3-3v-3zm12 0a6 6 0 0 0-6 6v2h6v-2h-3a3 3 0 0 1 3-3v-3z" />
            </svg>
            <p>&ldquo;Hands-down the best biryani in Durham — we drive from Ajax just to pick it up.&rdquo;</p>
            <span className="bento-quote-attr">— Saira K., Google Review</span>
          </div>

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
