"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Coffee, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { HeaderData } from "@/lib/responseType";

export const navLinks = [
  { href: "#home", label: "الرئيسية" },
  { href: "#about", label: "من نحن" },
  { href: "#services", label: "خدماتنا" },
  { href: "#gallery", label: "معرض الصور" },
  { href: "#contact", label: "تواصل معنا" },
];

export function Header({ brandName, phone }: HeaderData & { phone?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-white backdrop-blur-md shadow text-[hsl(var(--foreground)/0.8)]`}>
      <div className="container mx-auto px-3 md:px-0 py-4 flex items-center justify-between lg:gap-3 gap-0">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-3">
          <div className="size-10 bg-main-color rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-2xl">
              <Coffee />
            </span>
          </div>
          <div className="flex flex-col">
            <h2 className="lg:text-lg font-extrabold leading-tight tracking-tight">
              {brandName}
            </h2>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold hover:text-main-color transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="md:flex hidden items-center gap-4">
          <a
            href={`tel:${phone}`}
            className="hidden sm:flex items-center justify-center h-11 px-6 bg-main-color text-white rounded-lg text-sm font-bold hover:opacity-90 transition-all shadow-lg gap-3">
            احجز الان
            <ArrowLeft className="w-5 h-5" />
          </a>
        </div>
        <button
          aria-label="toggler button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="px-4 py-2 rounded-md bg-main-color text-white md:hidden flex">
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:hidden bg-[#ececec] border-t border-black/60 overflow-hidden">
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setTimeout(() => {
                      setIsMobileMenuOpen(false);
                    }, 600);
                  }}
                  className="text-[hsl(var(--foreground)/0.8)] hover:text-[hsl(var(--main-color))] transition-colors font-medium text-lg py-2">
                  {link.label}
                </a>
              ))}
              <a
                target="_blank"
                href={`tel:${phone}`}
                className="bg-main-color text-white mt-4 w-full py-3 rounded-lg text-center">
                احجز الآن
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
