"use client";

import { Star, Quote } from "lucide-react";

export interface Testimonial {
  id: string;
  clientName: string;
  clientCompany: string;
  rating: number;
  content: string;
  attestedDate?: string;
}

interface TestimonialsSectionProps {
  label?: string;
  title?: string;
  description?: string;
}

const sampleTestimonials = [
  {
    id: "1",
    clientName: "محمد الخالدي",
    clientCompany: "شركة الاتصالات السعودية",
    rating: 5,
    content:
      "خدمة ممتازة جداً! تميزت بالاحترافية والجودة العالية. قهوة عربية أصلية وضيافة فاخرة. سيكون اختيارنا الأول دائماً.",
    attestedDate: "فبراير 2024",
  },
  {
    id: "2",
    clientName: "فاطمة العتيبي",
    clientCompany: "البنك الأهلي السعودي",
    rating: 5,
    content:
      "فريق احترافي وملتزم بالتفاصيل. شعرنا بالعناية في كل لحظة من الحدث. نشكرهم على تجربة لا تُنسى.",
    attestedDate: "يناير 2024",
  },
  {
    id: "3",
    clientName: "سعود المطيري",
    clientCompany: "أرامكو السعودية",
    rating: 5,
    content:
      "أكثر من رائع! التنظيم والتنفيذ كان على أعلى مستوى. القهوة العربية بطعم أصلي وخدمة بخمس نجوم.",
    attestedDate: "ديسمبر 2023",
  },
  {
    id: "4",
    clientName: "نورا الدعيع",
    clientCompany: "شركة الزيت العربية",
    rating: 5,
    content:
      "تجربة رائعة من البداية للنهاية. الفريق احترافي والقهوة ممتازة. أنصح بشدة بالتعامل معهم.",
    attestedDate: "نوفمبر 2023",
  },
  {
    id: "5",
    clientName: "أحمد السويلم",
    clientCompany: "شركة سابك",
    rating: 5,
    content:
      "خدمة عالية الجودة وبأسعار عادلة. الفريق ملتزم وودي جداً. استمتعنا بكل دقيقة من الحدث.",
    attestedDate: "أكتوبر 2023",
  },
  {
    id: "6",
    clientName: "ليلى الحربي",
    clientCompany: "حضانة النور الدولية",
    rating: 5,
    content:
      "أفضل خدمة ضيافة في الرياض! كل شيء مثالي من البداية. شكر خاص لفريقهم المحترف.",
    attestedDate: "سبتمبر 2023",
  },
];
export function TestimonialsSection({
  label = "آراء عملائنا",
  title = "شهادات العملاء الراضين",
  description = "اكتشف ما يقوله عملاؤنا عن خدماتنا المميزة",
}: TestimonialsSectionProps) {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-24 bg-main-background">
      <div className="container mx-auto px-2">
        {/* Header */}
        <div className="flex flex-col mb-16 gap-6 max-w-2xl">
          <div>
            <h2 className="text-main-color text-sm font-black uppercase tracking-widest mb-4">
              {label}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold leading-tight">
              {title}
            </h3>
          </div>

          <p className="md:text-lg text-low-color">{description}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-main-color/20 flex flex-col">
              {/* Quote Icon */}
              <div className="size-12 bg-main-color/10 rounded-xl flex items-center justify-center text-main-color mb-6 group-hover:bg-main-color group-hover:text-white transition-colors">
                <Quote className="w-6 h-6" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Content */}
              <p className="text-low-color leading-relaxed mb-8 grow">
                {testimonial.content}
              </p>

              {/* Divider Line */}
              <div className="h-1 w-12 bg-main-color rounded-full mb-6 group-hover:w-full transition-all duration-500" />

              {/* Client Info */}
              <div>
                <h4 className="font-bold text-gray-900 mb-1">
                  {testimonial.clientName}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sampleTestimonials.length === 0 && (
          <div className="text-center py-16">
            <p className="text-low-color text-lg">
              لا توجد شهادات عملاء حتى الآن
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
