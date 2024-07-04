import UploadImageHero from '@/app/(client-components)/(Admin)/Hero/UploadImageHero';
import GalleryHero from '@/components/Gallery/GalleryHero';

export default async function Page() {
  return (
    <main className="flex flex-col items-center p-2 md:p-4 lg:p-6 min-h-screen">
      <div className="w-full max-w-7xl">
        <h1 className="text-2xl font-bold mb-4">
          Imagenes de la Home - Sección hero
        </h1>
        <UploadImageHero />
        <div className="pt-20">
          <GalleryHero />
        </div>
      </div>
    </main>
  );
}
