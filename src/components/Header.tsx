'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Menu', children: [
    { label: 'Dine In', href: '/menu/dine-in' },
    { label: 'Takeout', href: '/menu/takeout' },
  ]},
  { label: 'Specials', children: [
    { label: 'Takeout Daily Special', href: '/specials/daily' },
    { label: 'Weekend Special', href: '/specials/weekend' },
  ]},
  { label: 'Combos', children: [
    { label: 'Dine-In Combos', href: '/combos/dine-in' },
    { label: 'Takeout Combos', href: '/combos/takeout' },
  ]},
  { label: 'Catering', children: [
    { label: 'Catering Packages', href: '/catering' },
    { label: 'Party Trays', href: '/catering/party-trays' },
  ]},
  { label: "Kid's Menu", href: '/kids-menu' },
  { label: "FAQ's", href: '/faqs' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Promos', href: '/promos' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string|null>(null);

  return (
    <header className="header">
      <div className="container">
        <Link href="/" className="logo">
          <Image src="/images/logo.webp" alt="Food Time" width={120} height={50} priority />
        </Link>
        <button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <nav className={"nav" + (menuOpen ? ' open' : '')}>
          {navItems.map((item) => {
            if (item.children) {
              const isActive = item.children.some(c => pathname === c.href);
              const isOpen = openDropdown === item.label;
              return (
                <div key={item.label} className={"dropdown" + (isOpen ? ' open' : '')}>
                  <span onClick={(e) => { if (window.innerWidth <= 768) { e.stopPropagation(); setOpenDropdown(isOpen ? null : item.label); }}}>{item.label}</span>
                  <div className="dropdown-menu">
                    {item.children.map(c => (
                      <Link key={c.href} href={c.href} className={pathname === c.href ? 'active' : ''} onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}>{c.label}</Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link key={item.href} href={item.href!} className={pathname === item.href ? 'active' : ''} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
