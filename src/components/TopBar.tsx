import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
const c = siteConfig;
export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container">
        <div>
          <strong>Food Time Pickering:</strong>{' '}
          <a href={"tel:"+c.locations.pickering.phoneTel}>{c.locations.pickering.phone}</a> |{' '}
          <strong>Food Time Whitby:</strong>{' '}
          <a href={"tel:"+c.locations.whitby.phoneTel}>{c.locations.whitby.phone}</a> |{' '}
          <strong>Email:</strong>{' '}
          <a href={"mailto:"+c.email}>{c.email}</a>
        </div>
        <div><span className="halal-badge">Halal Food &amp; Free WiFi</span></div>
      </div>
    </div>
  );
}
