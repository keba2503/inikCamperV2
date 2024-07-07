import OfferUploadImage from '@/app/(client-components)/(Admin)/OfferGallery/OfferUploadImage';
import OfferGalleryAdmin from '@/app/(client-components)/(Admin)/OfferGallery/OfferGalleryAdmin';

export default async function Page() {
  return (
    <main className="flex flex-col items-center p-2 md:p-4 lg:p-6 min-h-screen">
      <div className="w-full max-w-7xl">
        <h1 className="text-2xl font-bold mb-4">Galeria de imagenes de las ofertas</h1>
        <OfferUploadImage />
        <div className="pt-20">
          <OfferGalleryAdmin />
        </div>
      </div>
    </main>
  );
}
