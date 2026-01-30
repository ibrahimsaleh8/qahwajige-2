import { FooterData } from "@/lib/responseType";
import { Coffee, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export function ContactSection({
  address,
  phone,
  email,
  whatsapp,
}: FooterData & { whatsapp: string }) {
  return (
    <section
      id="contact"
      className="py-24 bg-main-color text-white overflow-hidden relative p-4">
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <span className="material-symbols-outlined text-[400px]">
          <Coffee className="w-80 h-80" />
        </span>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="px-2">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              احجز خدمات قهوجيين الرياض الآن
            </h2>

            <p className="text-white/80 text-xl leading-relaxed mb-10">
              فريق قهوجيين الرياض جاهز لمناقشة احتياجاتك وتصميم تجربة ضيافة
              مخصصة تعكس واجهة مؤسستك وتليق بضيوفك. نحن متخصصون في خدمات القهوة
              العربية والضيافة الفاخرة للشركات والمناسبات في الرياض. اتصل بنا
              الآن للحصول على أفضل عروض الأسعار.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5" />{" "}
                </div>
                <div>
                  <p className="main-text-white text-sm">اتصل بنا مباشرة</p>
                  <a
                    target="_blank"
                    href={`tel:${phone}`}
                    className="text-white font-semibold text-lg hover:text-white/60 transition-colors">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-white/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="main-text-white text-sm">واتساب</p>
                  <a
                    target="_blank"
                    href={`https://wa.me/${whatsapp.includes("+") ? whatsapp.split("+").join("") : whatsapp}?text=`}
                    className="text-white font-semibold text-lg hover:text-white/60 transition-colors">
                    {whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="main-text-white text-sm">راسلنا عبر البريد</p>
                  <a
                    target="_blank"
                    href={`mailto:${email}`}
                    className="text-white font-semibold text-lg hover:text-white/60 transition-colors">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="main-text-white text-sm">الموقع</p>
                  <p>{address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
