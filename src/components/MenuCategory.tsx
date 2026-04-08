import MenuItem, { MenuItemData } from './MenuItem';

export type MenuCategoryData = {
  name: string;
  note?: string;
  items: MenuItemData[];
};

export default function MenuCategory({ category }: { category: MenuCategoryData }) {
  return (
    <div className="menu-category">
      {/* Carousel placeholder — replace with actual images later */}
      <div className="menu-section-carousel" style={{background:'#0a0a0a',border:'1px dashed #333',borderRadius:10,padding:24,textAlign:'center',marginBottom:20,color:'#555',fontSize:'0.85rem'}}>
        Image carousel for {category.name} (photos coming soon)
      </div>
      <h3>{category.name}</h3>
      {category.note && <p style={{color:'var(--text-light)',marginBottom:16,fontStyle:'italic'}}>{category.note}</p>}
      {category.items.map((item, i) => <MenuItem key={i} item={item} />)}
    </div>
  );
}
