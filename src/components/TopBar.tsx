import { siteConfig } from '@/data/siteConfig';
const c = siteConfig;
export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-info">
          <span className="tb-item">
            <strong>Pickering:</strong>{' '}
            <a href={"tel:"+c.locations.pickering.phoneTel}>{c.locations.pickering.phone}</a>
          </span>
          <span className="tb-sep" aria-hidden="true">|</span>
          <span className="tb-item">
            <strong>Whitby:</strong>{' '}
            <a href={"tel:"+c.locations.whitby.phoneTel}>{c.locations.whitby.phone}</a>
          </span>
          <span className="tb-sep" aria-hidden="true">|</span>
          <span className="tb-item">
            <strong>Email:</strong>{' '}
            <a href={"mailto:"+c.email}>{c.email}</a>
          </span>
        </div>
        <div><span className="halal-badge">Halal Food &amp; Free WiFi</span></div>
      </div>
    </div>
  );
}
