"use client";
import { motion } from "motion/react";
import { PackageData } from "@/lib/responseType";
import { Check, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function PremiumPackagesSection({
  whatsapp,
  packages,
}: {
  whatsapp: string;
  packages: PackageData[];
}) {
  const whatsappNumber = whatsapp.includes("+")
    ? whatsapp.split("+").join("")
    : whatsapp;
  const waLink = `https://wa.me/${whatsappNumber}?text=`;

  if (!packages?.length) return null;

  return (
    <section
      id="packages"
      className="py-20 md:py-28 bg-[#f6f6f8] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14" dir="rtl">
          <span className="inline-block text-[#1241a1] text-sm font-semibold tracking-widest mb-3">
            باقاتنا
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111318] mb-4">
            اختر الباقة المناسبة لك
          </h2>
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-px w-16 bg-[#1241a1]/20" />
            <div className="w-8 h-1 bg-[#1241a1] rounded-full" />
            <div className="h-px w-16 bg-[#1241a1]/20" />
          </div>
          <p className="text-[#4b5563] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            نقدم لك مجموعة متميزة من الباقات المصممة بعناية لتلبي احتياجاتك
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              viewport={{ once: true }}
              key={pkg.id}
              className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-[#e2e5eb] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "16/9" }}>
                {pkg.image ? (
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    width={600}
                    height={338}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#eef1f8]">
                    <span className="text-5xl font-extrabold text-[#1241a1]/20">
                      {pkg.title?.charAt(0) ?? "؟"}
                    </span>
                  </div>
                )}
                {/* Blue tint overlay on hover */}
                <div className="absolute inset-0 bg-[#1241a1]/0 group-hover:bg-[#1241a1]/8 transition-colors duration-300" />
              </div>

              {/* Top blue accent line on hover */}
              <div className="h-0.5 w-full bg-[#1241a1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="flex flex-col flex-1 p-6" dir="rtl">
                {/* Package label pill */}
                <span className="inline-flex items-center gap-1.5 text-[#1241a1] text-xs font-bold tracking-wide mb-2 bg-[#1241a1]/8 px-2.5 py-1 rounded-full w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1241a1] inline-block" />
                  الباقة {index + 1}
                </span>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-[#111318] mb-3 text-right">
                  {pkg.title}
                </h3>

                {/* Divider */}
                <div className="w-8 h-0.5 bg-[#1241a1]/30 rounded-full mb-4" />

                {/* Features */}
                {pkg.features?.length > 0 ? (
                  <div className="flex-1 mb-6">
                    <p className="text-[#4b5563] text-xs font-semibold mb-3 text-right uppercase tracking-wide">
                      المميزات
                    </p>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-right">
                          <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-[#1241a1]/10 flex items-center justify-center">
                            <Check
                              className="w-2.5 h-2.5 text-[#1241a1]"
                              strokeWidth={3}
                            />
                          </span>
                          <span className="text-[#4b5563] text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="flex-1 mb-6" />
                )}

                {/* CTA Button */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 bg-main-color text-white hover:bg-main-color/90 shadow-sm hover:shadow-md">
                  <MessageCircle className="w-4 h-4" />
                  اطلب الخدمة عبر واتساب
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
