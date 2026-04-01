import Image from 'next/image';
import { siteConfig } from '@/data/siteConfig';
const c = siteConfig;
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
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
          <div>
            <h4>Pickering Location</h4>
            <p>{c.locations.pickering.address}<br />{c.locations.pickering.addressLine2}</p>
            <p style={{marginTop:8}}><a href={"tel:"+c.locations.pickering.phoneTel}>{c.locations.pickering.phone}</a></p>
          </div>
          <div>
            <h4>Whitby Location</h4>
            <p>{c.locations.whitby.address}<br />{c.locations.whitby.addressLine2}</p>
            <p style={{marginTop:8}}><a href={"tel:"+c.locations.whitby.phoneTel}>{c.locations.whitby.phone}</a></p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Catering: <a href={"tel:"+c.catering.phoneTel}>{c.catering.phone}</a></p>
            <p>Email: <a href={"mailto:"+c.email}>{c.email}</a></p>
            <h4 style={{marginTop:20}}>Payment</h4>
            <div className="payment-icons">
              <Image src="/images/visa.png" alt="Visa" width={45} height={30} />
              <Image src="/images/mastercard.png" alt="Mastercard" width={45} height={30} />
              <Image src="/images/interac.png" alt="Interac" width={45} height={30} />
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
