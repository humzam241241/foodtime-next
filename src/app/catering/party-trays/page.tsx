import { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { trayCategories } from '@/data/partyTrays';

export const metadata: Metadata = { title: 'Party Trays' };

export default function PartyTraysPage() {
  return (
    <>
      <PageHeader title="Party Trays" subtitle="Perfect for events, parties and gatherings" />
      <div className="party-trays-banner">
        <Image
          src="/images/tray-sizes.jpeg"
          alt="Party tray sizes — Small, Medium, Large aluminum trays"
          width={1536}
          height={864}
          priority
          sizes="100vw"
        />
      </div>
      <section className="section"><div className="container">
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
