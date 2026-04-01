import { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { trayCategories } from '@/data/partyTrays';

export const metadata: Metadata = { title: 'Party Trays' };

export default function PartyTraysPage() {
  return (
    <>
      <PageHeader title="Party Trays" subtitle="Perfect for events, parties and gatherings" />
      <section className="section"><div className="container">
        <div style={{textAlign:'center',padding:'0 0 40px'}}>
          <Image src="/images/trays.webp" alt="Party Trays" width={500} height={600} style={{maxWidth:500,borderRadius:12,boxShadow:'0 4px 20px rgba(0,0,0,0.12)'}} />
        </div>
        {trayCategories.map((cat, ci) => (
          <div key={ci} className="menu-category">
            <h3>{cat.name}</h3>
            <table className="tray-table">
              <thead><tr>{cat.headers.map((h,i) => <th key={i}>{h}</th>)}</tr></thead>
              <tbody>{cat.rows.map((row, ri) => <tr key={ri}>{row.map((cell, ci2) => <td key={ci2}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        ))}
      </div></section>
    </>
  );
}
