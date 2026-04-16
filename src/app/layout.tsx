import type { Metadata } from 'next';
import { Open_Sans, Playfair_Display } from 'next/font/google';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', weight: ['600', '700'] });

export const metadata: Metadata = {
  title: { default: 'Food Time | Halal Pakistani & Indian Cuisine', template: '%s | Food Time' },
  description: 'Authentic Halal Pakistani & Indian cuisine in Pickering & Whitby, Ontario. Dine-in, takeout, catering, and party trays.',
  icons: { icon: '/images/favicon.webp' },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    viewportFit: 'cover',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Food Time',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${playfair.variable}`}>
      <body style={{ fontFamily: 'var(--font-open-sans), Arial, sans-serif' }}>
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <script
          src="https://chattybot-widget.vercel.app/widget.js?v=1775673271978"
          data-site-id="2b947a09-a408-424a-8402-202714dce80a"
          data-api-url="https://chattybot-0jvh.onrender.com"
          async
        />
      </body>
    </html>
  );
}
