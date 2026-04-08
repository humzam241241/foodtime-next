import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import MenuItem from '@/components/MenuItem';
import { dineInCombos, singleCombos } from '@/data/combos';

export const metadata: Metadata = { title: 'Dine-In Combo Deals' };

export default function DineInCombosPage() {
  return (
    <>
      <PageHeader title="Dine-In Combo Deals" subtitle="Great value meals for every appetite" />
      <section className="section"><div className="container">

        {/* Carousel placeholder for multi-person combos */}
        <div className="combo-carousel-placeholder" style={{background:'#0f0f0f',border:'2px dashed #333',borderRadius:12,padding:40,textAlign:'center',marginBottom:32,color:'#666'}}>
          <p style={{fontSize:'0.9rem'}}>Combo carousel images will be added here</p>
        </div>

        <div className="combo-grid">
          {dineInCombos.map((c, i) => (
            <div key={i} className="combo-card">
              <h3>{c.name}</h3>
              <div className="combo-price">{c.price}</div>
              <ul>{c.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
            </div>
          ))}
        </div>

        <div className="menu-category" style={{marginTop:48}}>
          <h3>Dine-In Combo For 1</h3>
          {singleCombos.map((c, i) => (
            <div key={i} style={{display:'flex',gap:16,alignItems:'flex-start',marginBottom:8}}>
              {/* Individual combo image placeholder */}
              <div style={{width:80,height:80,minWidth:80,background:'#0f0f0f',border:'1px dashed #333',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'#444',fontSize:'0.7rem'}}>
                Photo
              </div>
              <div style={{flex:1}}>
                <MenuItem item={c} />
              </div>
            </div>
          ))}
        </div>
      </div></section>
    </>
  );
}
