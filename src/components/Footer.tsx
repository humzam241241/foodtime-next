import Image from 'next/image';
import { siteConfig } from '@/data/siteConfig';
const c = siteConfig;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Hours — full-width column so they're not crammed */}
          <div>
            <h4>Hours</h4>
            <table className="hours-table"><tbody>
              {c.hours.map(h => (
                <tr key={h.day}>
                  <td className={h.close === 'Closed' ? 'closed' : ''}>{h.day}</td>
                  <td className={h.close === 'Closed' ? 'closed' : ''}>{h.close === 'Closed' ? 'Closed' : h.open + ' - ' + h.close}</td>
                </tr>
              ))}
            </tbody></table>
          </div>

          {/* Both locations stacked in one column */}
          <div>
            <h4>Pickering Location</h4>
            <p>{c.locations.pickering.address}<br />{c.locations.pickering.addressLine2}</p>
            <p style={{marginTop:8}}><a href={"tel:"+c.locations.pickering.phoneTel}>{c.locations.pickering.phone}</a></p>

            <div style={{borderTop:'1px solid rgba(139,0,0,0.4)',margin:'20px 0',paddingTop:20}}>
              <h4>Whitby Location</h4>
              <p>{c.locations.whitby.address}<br />{c.locations.whitby.addressLine2}</p>
              <p style={{marginTop:8}}><a href={"tel:"+c.locations.whitby.phoneTel}>{c.locations.whitby.phone}</a></p>
            </div>
          </div>

          {/* Contact + Socials + Payment */}
          <div>
            <h4>Contact</h4>
            <p>Catering: <a href={"tel:"+c.catering.phoneTel}>{c.catering.phone}</a></p>
            <p>Email: <a href={"mailto:"+c.email}>{c.email}</a></p>

            <h4 style={{marginTop:22}}>Follow Us</h4>
            <div className="socials">
              <a className="social-btn" href={c.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.3-1.5 1.6-1.5H17V4.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.1H8v3h2.5V21h3z"/></svg>
              </a>
              <a className="social-btn" href={c.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a className="social-btn" href={c.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3h-2.8v12.2a2.4 2.4 0 11-2.4-2.4c.3 0 .5 0 .7.1V10a5.4 5.4 0 00-.7-.1 5.3 5.3 0 105.3 5.3V9.1a7 7 0 004.2 1.4V7.7a4.2 4.2 0 01-4.3-4.7z"/></svg>
              </a>
            </div>

            <h4 style={{marginTop:22}}>Payment</h4>
            <div className="payment-icons">
              <Image src="/images/visa.png" alt="Visa" width={45} height={30} />
              <Image src="/images/mastercard.png" alt="Mastercard" width={45} height={30} />
              <Image src="/images/interac.png" alt="Interac" width={45} height={30} />
              <span style={{color:'#fff',fontWeight:700,fontSize:'0.8rem',background:'#016fd0',padding:'4px 8px',borderRadius:4,lineHeight:1}}>AMEX</span>
              <span style={{color:'#fff',fontWeight:700,fontSize:'0.8rem',background:'#78b82a',padding:'4px 8px',borderRadius:4,lineHeight:1}}>Interac</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">&copy; {new Date().getFullYear()} Food Time Restaurant. All rights reserved.</div>
      </div>
    </footer>
  );
}
