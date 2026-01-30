import { BadgeCheck, ChevronLeft, Star, Users } from "lucide-react";
import heroImage from "@images/hero-coffee.webp";
import Image from "next/image";
import { HeroSectionData } from "@/lib/responseType";
export function HeroSection({
  headline,
  subheadline,
  whatsApp,
  image,
}: HeroSectionData & { image?: string | null }) {
  return (
    <section
      id="home"
      className="relative bg-white py-10 pt-3 md:pt-10 overflow-hidden">
      <div className="container px-2 mx-auto flex flex-col lg:flex-row min-h-175">
        {/* Text */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-main-color/10 text-main-color text-xs font-bold mb-6 w-fit">
            <BadgeCheck className="w-4 h-4" />
            الخيار الأول لكبرى شركات الرياض
          </div>

          <h1 className="font-black md:text-3xl text-2xl xl:text-6xl lg:text-4xl leading-[1.6] mb-6">
            {headline}
          </h1>

          <p className="text-low-color lg:text-lg md:text-base text-sm xl:text-xl leading-relaxed mb-10 max-w-135">
            {subheadline}
          </p>

          <div className="flex flex-wrap items-center md:justify-start justify-center gap-4">
            <a
              target="_blank"
              href={`https://wa.me/${whatsApp?.includes("+") ? whatsApp.split("+").join("") : whatsApp}?text=`}
              className="py-2.5 px-8 w-fit bg-main-color border border-main-color text-white rounded-lg font-bold hover:scale-[1.02] transition-transform flex items-center gap-2">
              اطلب عرض سعر
              <ChevronLeft />
            </a>

            <a
              href="#gallery"
              className="flex items-center py-2.5 px-8 w-fit border border-gray-300 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              مشاهدة أعمالنا
            </a>
          </div>
        </div>

        {/* Image Side */}
        <div className="w-full lg:w-1/2 h-96 lg:h-auto relative">
          <div className="absolute inset-0 bg-main-color/5 z-10 pointer-events-none" />

          <Image
            src={image ?? heroImage}
            alt="قهوجيين الرياض - خدمات القهوة العربية والضيافة الفاخرة في الرياض"
            className="w-full h-full object-cover object-center rounded-2xl"
            loading="eager"
            priority
            fill
            // sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
            quality={85}
          />

          {/* Stats Card */}
          <div className="absolute bottom-10 right-10 z-20 bg-white p-6 rounded-xl shadow-2xl hidden md:block border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-12 rounded-full bg-main-color/10 flex items-center justify-center text-main-color">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black">+500</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-tighter">
                  عميل من كبرى الشركات
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-center flex-wrap">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
