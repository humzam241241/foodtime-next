import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';
import WelcomeCarousel from '@/components/WelcomeCarousel';
import DailySpecialsCarousel from '@/components/DailySpecialsCarousel';
import CateringPackages from '@/components/CateringPackages';
import MarqueeRow from '@/components/MarqueeRow';
import CursorSpotlight from '@/components/CursorSpotlight';
import AnimatedCounter from '@/components/AnimatedCounter';
import { readHeroSlides } from '@/lib/heroImagesStore';
import { marqueeTop, marqueeMiddle, communityStrip } from '@/data/galleryImages';

// Always fetch the latest hero config at request time so admin edits show up immediately.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const { slides } = await readHeroSlides();

  return (
    <>
      <HeroCarousel slides={slides} />
      <CursorSpotlight target=".hero" />

      {/* On The Plate — opening marquee band, sets appetite */}
      <section className="section section-marquee">
        <div className="marquee-eyebrow">
          <span className="eyebrow-line" />
          <span className="eyebrow-label">On The Plate Today</span>
          <span className="eyebrow-line" />
        </div>
        <MarqueeRow images={marqueeTop} speed={55} direction="left" height={220} />
        <MarqueeRow images={marqueeMiddle} speed={70} direction="right" height={220} />
      </section>

      {/* Welcome message + rotating carousel of most popular items */}
      <section className="section">
        <div className="container">
          <h2>A Warm <span className="accent">Welcome</span> From Our Kitchen</h2>
          <p className="subtitle">
            Serving Durham Region since day one — these are the dishes our guests come back for, week after week.
          </p>
          <WelcomeCarousel />
        </div>
      </section>

      {/* Daily Specials carousel */}
      <section className="section section-alt">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Daily <span className="accent">Specials</span></h2>
          <p className="subtitle">A different special every day of the week — at unbeatable prices.</p>
          <DailySpecialsCarousel />
          <br />
          <Link href="/specials/daily" className="btn" style={{ marginTop: 24 }}>See Full Weekly Menu</Link>
        </div>
      </section>

      {/* Community — infinite marquee replaces static 3-photo grid */}
      <section className="section">
        <div className="container">
          <h2>Our <span className="accent">Community</span></h2>
          <p className="subtitle">Bringing families together over authentic flavors.</p>

          <p className="community-intro">
            Food Time is more than a restaurant — we&apos;re part of the fabric of Durham Region. We partner with local
            mosques, schools, and charities year-round, donate meals during Ramadan iftars, sponsor community
            iftaar drives, and host fundraising events at both our Pickering and Whitby locations. When you eat
            with us, you&apos;re supporting neighbours helping neighbours.
          </p>
        </div>

        <MarqueeRow images={communityStrip} speed={80} direction="left" height={280} />

        <div className="container">
          <div className="community-stats">
            <div className="stat-card tilt-auto">
              <span className="num"><AnimatedCounter to={15} suffix="+" /></span>
              <span className="label">Years Serving Durham</span>
            </div>
            <div className="stat-card tilt-auto">
              <span className="num"><AnimatedCounter to={50} suffix="+" /></span>
              <span className="label">Community Events / Year</span>
            </div>
            <div className="stat-card tilt-auto">
              <span className="num"><AnimatedCounter to={2} /></span>
              <span className="label">Locations — Pickering &amp; Whitby</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catering Packages — replaces the 3-tray block on homepage */}
      <CateringPackages />
    </>
  );
}
