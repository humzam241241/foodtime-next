import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import MasonryGallery from '@/components/MasonryGallery';
import { allImages } from '@/data/foodImages';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Every dish, every day — fresh photography from our Pickering and Whitby kitchens.',
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader title="Gallery" subtitle="Every dish we plate — straight from our kitchen" />
      <section className="section">
        <div className="container">
          <MasonryGallery items={allImages} />
        </div>
      </section>
    </>
  );
}
