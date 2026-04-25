import { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { trayCategories } from '@/data/partyTrays';

export const metadata: Metadata = { title: 'Party Trays' };

export default function PartyTraysPage() {
  return (
    <>
      <div className="party-trays-banner">
        <Image
          src="/images/foodtime-banner.jpeg"
          alt="Food Time — For The Best Pakistani & Indian Cuisine"
          width={1600}
          height={400}
          priority
          sizes="100vw"
        />
      </div>
      <PageHeader title="Party Trays" subtitle="Perfect for events, parties and gatherings" />
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
