import { GalleryImageData } from "@/lib/responseType";
import Image from "next/image";

export function GallerySection({ gallery }: { gallery: GalleryImageData[] }) {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            معرض أعمال قهوجيين الرياض
          </h2>
          <p className="text-low-color mt-4">
            لمحات من خدمات القهوة العربية والضيافة الفاخرة في أبرز محافل الرياض
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((image, index) => (
            <div
              key={index}
              className={`relative bg-white/60 overflow-hidden rounded-2xl cursor-pointer group shadow-soft hover:shadow-luxury transition-all duration-300`}>
              <div className={`aspect-square `}>
                <Image
                  src={image.url}
                  alt={image.alt ?? `صورة-${index + 1}`}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-[hsl(var(--coffee-dark)/0)] group-hover:bg-[hsl(var(--coffee-dark)/0.4)] transition-colors duration-300 flex items-center justify-center rounded-2xl">
                <span className="text-[hsl(var(--cream))] opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold text-center px-2">
                  {image.alt ?? `صورة-${index + 1}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
