"use client";

import { Coffee, Mail, MapPin, Phone } from "lucide-react";
import { navLinks } from "./Header";
import mapimage from "@images/map.webp";
import Image from "next/image";
import { FooterData } from "@/lib/responseType";
const currentYear = new Date().getFullYear();

export function Footer({
  address,
  phone,
  brandName,
  email,
  description,
}: FooterData & { description?: string }) {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-200">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-main-color rounded flex items-center justify-center text-white">
                <Coffee className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-extrabold">{brandName}</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {description}{" "}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-6">روابط سريعة</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-main-color transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-6">معلوماتنا</h3>
            <ul className="space-y-7 text-sm text-gray-600">
              <li className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {address}
              </li>
              <li className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {email}
              </li>
              <li className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {phone}
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-bold mb-6">الموقع</h3>
            <Image
              src={mapimage}
              alt="موقع قهوجيين الرياض - خدمات القهوة العربية في الرياض، المملكة العربية السعودية"
              className="rounded-lg overflow-hidden h-32 mb-4 bg-gray-200 object-cover object-center"
            />

            <p className="text-sm text-gray-600">
              الرياض، المملكة العربية السعودية
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-center md:text-left">
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <p>{brandName}</p>
            <p> جميع الحقوق محفوظة © {currentYear}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
