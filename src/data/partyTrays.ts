export type TrayCategory = { name: string; headers: string[]; rows: string[][] };
export const trayCategories: TrayCategory[] = [
  { name: 'Biryani Trays', headers: ['Item','Small (5-8)','Medium (10-15)','Large (20-25)'], rows: [['Biryani Rice','$35','$50','$65'],['Chicken','$45','$65','$80'],['Veal','$65','$90','$120'],['Goat','$75','$120','$150'],['Vegetable','$45','$65','$80'],['Shrimp','$65','$90','$120']] },
  { name: 'BBQ Items', headers: ['Item','Small','Medium','Large'], rows: [['Chicken/Beef Kabobs','$115 (20 pcs)','$175 (30 pcs)','$220 (40 pcs)'],['Tandoori Chicken','$65 (10 legs)','$100 (15 legs)','$135 (20 legs)'],['Chicken Tikka Boneless Dark','$80 (40 pcs)','$120 (60 pcs)','$160 (80 pcs)']] },
  { name: 'Chicken Curries', headers: ['Item','Small (10-12)','Medium (13-20)','Large (21-35)'], rows: [['Chicken Karahi','$80','$120','$160'],['Chicken Qorma','$75','$115','$150'],['Butter Chicken','$90','$135','$175'],['Chilli Chicken','$90','$135','$175'],['Chicken Jalfrazi','$90','$135','$175'],['Chicken Tikka Masala','$90','$135','$175']] },
  { name: 'Veal Curries', headers: ['Item','Small','Medium','Large'], rows: [['Veal Karahi','$85','$125','$165'],['Veal Qorma','$85','$125','$165'],['Beef Nahari','$90','$135','$175']] },
  { name: 'Goat Curries', headers: ['Item','Small','Medium','Large'], rows: [['Goat Karahi','$95','$150','$185'],['Goat Qorma','$95','$150','$185']] },
  { name: 'Other Trays', headers: ['Item','Small','Medium','Large'], rows: [['Mix Veg','$65','$100','$130'],['Chana Masala','$65','$100','$130'],['Mash/Shahi Daal','$65','$100','$130'],['Fish Curry','$85','$125','$165'],['Shrimp Curry','$85','$125','$165'],['Haleem','$90','$135','$175']] },
  { name: 'Sweets Trays', headers: ['Item','Small','Medium','Large'], rows: [['Kheer','$50','$75','$100'],['Carrot Halwa','$75','$100','$125']] },
];
