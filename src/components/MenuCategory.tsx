import MenuItem, { MenuItemData } from './MenuItem';

export type MenuCategoryData = {
  name: string;
  note?: string;
  items: MenuItemData[];
};

export default function MenuCategory({ category }: { category: MenuCategoryData }) {
  return (
    <div className="menu-category">
      <h3>{category.name}</h3>
      {category.note && <p style={{color:'var(--text-light)',marginBottom:16,fontStyle:'italic'}}>{category.note}</p>}
      {category.items.map((item, i) => <MenuItem key={i} item={item} />)}
    </div>
  );
}
