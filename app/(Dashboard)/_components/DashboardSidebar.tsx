"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Info,
  Briefcase,
  KeyRound,
  Image,
} from "lucide-react";

// Menu items
const items = [
  {
    title: "الرئيسية",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "من نحن",
    url: "/dashboard/about",
    icon: Info,
  },
  {
    title: "خدماتنا",
    url: "/dashboard/services",
    icon: Briefcase,
  },
  {
    title: "الكلمات المفتاحية",
    url: "/dashboard/keywords",
    icon: KeyRound,
  },
  {
    title: "معرض الصور",
    url: "/dashboard/gallary",
    icon: Image,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-main-color!">
      <SidebarContent className="py-10 bg-main-color! text-white!">
        {/* Header */}
        <div className="px-5 text-xl font-bold text-right">لوحة التحكم</div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70 text-right">
            القائمة الرئيسية
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <ul className="flex flex-col gap-4 w-full">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url;

                return (
                  <li className="w-full flex" key={item.title}>
                    <Link
                      href={item.url}
                      className={`flex text-right items-center gap-3 w-full px-6 py-4 rounded-sm font-medium
                        ${isActive ? "bg-white text-main-color" : "text-white"}
                        hover:bg-white hover:text-main-color transition-colors duration-300`}>
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
