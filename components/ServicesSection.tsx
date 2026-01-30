import { ServicesSectionData } from "@/lib/responseType";
import {
  BriefcaseBusiness,
  Medal,
  CalendarDays,
  Coffee,
  Users,
  Heart,
  Building2,
  LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  BriefcaseBusiness,
  Medal,
  CalendarDays,
  Coffee,
  Users,
  Heart,
  Building2,
};

export function ServicesSection({
  description,
  items,
  label,
  title,
}: ServicesSectionData) {
  return (
    <section id="services" className="py-24 bg-main-background">
      <div className="container mx-auto">
        <div className="flex flex-col mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-main-color text-sm font-black uppercase tracking-widest mb-4">
              {label}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold leading-tight">
              {title}
            </h3>
          </div>

          <p className="md:text-lg text-low-color my-3">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {items &&
            items.map((card) => {
              const IconComponent = iconMap[card.icon as keyof typeof iconMap];

              return (
                <div
                  key={card.title}
                  className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-main-color/10 w-full">
                  <div className="size-16 bg-main-color/10 rounded-xl flex items-center justify-center text-main-color mb-8 group-hover:bg-main-color group-hover:text-white transition-colors">
                    {IconComponent && <IconComponent className="w-8 h-8" />}
                  </div>

                  <h4 className="text-xl font-bold mb-4">{card.title}</h4>

                  <p className="text-low-color leading-relaxed mb-6">
                    {card.description}
                  </p>

                  <div className="h-1 w-12 bg-main-color rounded-full group-hover:w-full transition-all duration-500" />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
