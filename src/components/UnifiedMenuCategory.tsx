import { MenuCategoryData } from './MenuCategory';
import MenuSectionCarousel from './MenuSectionCarousel';
import { getImagesForCategory } from '@/data/menuCategoryImages';

export default function UnifiedMenuCategory({ dineIn, takeout }: { dineIn: MenuCategoryData; takeout: MenuCategoryData }) {
  const images = getImagesForCategory(dineIn.name);
  return (
    <div className="menu-category">
      <MenuSectionCarousel images={images} />
      <h3 className="unified-category-heading">
        <span>{dineIn.name}</span>
        <span className="heading-price-labels">
          <span className="label-dinein">Dine-In</span>
          <span className="label-takeout">Takeout</span>
        </span>
      </h3>
      {dineIn.note && <p style={{color:'var(--text-light)',marginBottom:16,fontStyle:'italic'}}>{dineIn.note}</p>}
      {dineIn.items.map((item, i) => {
        const to = takeout.items[i];
        return (
          <div key={i} className="menu-item unified-menu-item">
            <div className="menu-item-info">
              <div className="menu-item-name">{item.name}</div>
              {item.description && <div className="menu-item-desc">{item.description}</div>}
              {item.variants && (
                <div className="menu-item-variants-unified">
                  {item.variants.map((v, vi) => {
                    const toVariant = to?.variants?.[vi];
                    return (
                      <div key={v.label} className="variant-row">
                        <span className="variant-label">{v.label}</span>
                        <span className="variant-price dinein">{v.price}</span>
                        <span className="variant-price takeout">{toVariant?.price ?? v.price}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {item.price && (
              <div className="menu-item-prices">
                <span className="price-dinein">{item.price}</span>
                <span className="price-takeout">{to?.price ?? item.price}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
