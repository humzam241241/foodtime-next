import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';
import WelcomeCarousel from '@/components/WelcomeCarousel';
import DailySpecialsCarousel from '@/components/DailySpecialsCarousel';
import CateringPackages from '@/components/CateringPackages';
import MarqueeRow from '@/components/MarqueeRow';
import CursorSpotlight from '@/components/CursorSpotlight';
import BentoGrid from '@/components/BentoGrid';
import CinematicBreak from '@/components/CinematicBreak';
import { readHeroSlides } from '@/lib/heroImagesStore';
import {
  marqueeTop,
  marqueeMiddle,
  communityStrip,
  heroImages,
  signatureImages,
} from '@/data/foodImages';

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
        <MarqueeRow images={marqueeTop} speed={55} direction="left" height={220} lightbox="home-top" />
        <MarqueeRow images={marqueeMiddle} speed={70} direction="right" height={220} lightbox="home-mid" />
      </section>

      {/* Bento — "Why Food Time" */}
      <BentoGrid />

      {/* Welcome message + rotating carousel of most popular items */}
      <section className="section section-alt">
        <div className="container">
          <h2>A Warm <span className="accent">Welcome</span> From Our Kitchen</h2>
          <p className="subtitle">
            Serving Durham Region since day one — these are the dishes our guests come back for, week after week.
          </p>
          <WelcomeCarousel />
        </div>
      </section>

      {/* Cinematic break — silent, filmic pause */}
      <CinematicBreak
        image={heroImages.curries}
        alt="Slow-simmered curries"
        eyebrow="Since day one"
        title="Spices ground fresh. Stocks simmered overnight."
        body="No shortcuts, no freezer tricks — just the way grandma taught us."
      />

      {/* Daily Specials carousel */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Daily <span className="accent">Specials</span></h2>
          <p className="subtitle">A different special every day of the week — at unbeatable prices.</p>
          <DailySpecialsCarousel />
          <br />
          <Link href="/specials/daily" className="btn" style={{ marginTop: 24 }}>See Full Weekly Menu</Link>
        </div>
      </section>

      {/* Community — infinite marquee (lightbox enabled) */}
      <section className="section section-alt">
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

        <MarqueeRow images={communityStrip} speed={80} direction="left" height={280} lightbox="home-community" />

        <div className="container">
          <div className="community-stats">
            <div className="stat-card tilt-auto">
              <span className="num">15+</span>
              <span className="label">Years Serving Durham</span>
            </div>
            <div className="stat-card tilt-auto">
              <span className="num">50+</span>
              <span className="label">Community Events / Year</span>
            </div>
            <div className="stat-card tilt-auto">
              <span className="num">2</span>
              <span className="label">Locations — Pickering &amp; Whitby</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic break #2 — catering tease */}
      <CinematicBreak
        image={signatureImages.bbq}
        alt="BBQ platter for catering"
        eyebrow="For your next event"
        title="Feed 50. Feed 500."
        body="Weddings, corporate lunches, community iftaars — all cooked fresh on the day."
        ctaHref="/catering"
        ctaLabel="See Catering Packages"
      />

      {/* Catering Packages — replaces the 3-tray block on homepage */}
      <CateringPackages />
    </>
  );
}
