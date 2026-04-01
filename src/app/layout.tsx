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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${playfair.variable}`}>
      <body style={{ fontFamily: 'var(--font-open-sans), Arial, sans-serif' }}>
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
