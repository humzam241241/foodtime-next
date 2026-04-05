import { requireAdmin } from '@/lib/adminGuard';
import { readHeroSlides, blobConfigured } from '@/lib/heroImagesStore';
import { listAllImages } from '@/lib/imageLibrary';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  await requireAdmin();

  const [{ slides, source }, images] = await Promise.all([
    readHeroSlides(),
    listAllImages(),
  ]);

  return (
    <AdminDashboard
      initialSlides={slides}
      initialImages={images}
      source={source}
      blobConfigured={blobConfigured()}
    />
  );
}
