export type MenuItemData = {
  name: string;
  description?: string;
  price?: string;
  variants?: { label: string; price: string }[];
};

export default function MenuItem({ item }: { item: MenuItemData }) {
  return (
    <div className="menu-item">
      <div className="menu-item-info">
        <div className="menu-item-name">{item.name}</div>
        {item.description && <div className="menu-item-desc">{item.description}</div>}
        {item.variants && (
          <div className="menu-item-variants">
            {item.variants.map(v => <span key={v.label}>{v.label} {v.price}</span>)}
          </div>
        )}
      </div>
      {item.price && <div className="menu-item-price">{item.price}</div>}
    </div>
  );
}
