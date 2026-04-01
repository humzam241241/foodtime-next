export type TrayCategory = { name: string; headers: string[]; rows: string[][] };
export const trayCategories: TrayCategory[] = [
  { name: 'Biryani Trays', headers: ['Item','Small (5-8)','Medium (10-15)','Large (20-25)'], rows: [['Biryani Rice','$35','$45','$75'],['Chicken','$40','$60','$95'],['Veal','$55','$80','$125'],['Goat','$70','$100','$150'],['Vegetable','$35','$45','$75'],['Shrimp','$55','$80','$125']] },
  { name: 'BBQ Items', headers: ['Item','Small','Medium','Large'], rows: [['Chicken/Beef Kabobs','$75 (15 pcs)','$120 (25 pcs)','$165 (35 pcs)'],['Tandoori Chicken','$55 (10 legs)','$85 (15 legs)','$115 (20 legs)'],['Chicken Tikka Boneless Dark','$75 (40 pcs)','$115 (60 pcs)','$150 (80 pcs)']] },
  { name: 'Chicken Curries', headers: ['Item','Small (10-12)','Medium (13-20)','Large (21-35)'], rows: [['Chicken Karahi','$65','$95','$145'],['Chicken Qorma','$65','$95','$145'],['Butter Chicken','$65','$95','$135'],['Chilli Chicken','$65','$120','$160'],['Chicken Jalfrazi','$65','$120','$160'],['Chicken Tikka Masala','$65','$120','$160']] },
  { name: 'Veal Curries', headers: ['Item','Small','Medium','Large'], rows: [['Veal Karahi','$65','$110','$150'],['Veal Qorma','$65','$110','$150'],['Beef Nahari','$65','$110','$150']] },
  { name: 'Goat Curries', headers: ['Item','Small','Medium','Large'], rows: [['Goat Karahi','$95','$150','$175'],['Goat Qorma','$95','$150','$165']] },
  { name: 'Other Trays', headers: ['Item','Small','Medium','Large'], rows: [['Mix Veg','$50','$90','$120'],['Chana Masala','$50','$90','$120'],['Mash/Shahi Daal','$50','$90','$120'],['Fish Curry','$65','$110','$150'],['Shrimp Curry','$65','$110','$150'],['Haleem','$65','$110','$150']] },
  { name: 'Sweets Trays', headers: ['Item','Small','Medium','Large'], rows: [['Kheer','$50','$90','$120'],['Carrot Halwa','$50','$90','$120']] },
];
