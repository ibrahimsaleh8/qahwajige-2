import { AboutSectionData } from "@/lib/responseType";
import { Award, Target, Users, Heart } from "lucide-react";

export function AboutUsSection({
  description1,
  label,
  title,
}: AboutSectionData) {
  return (
    <section id="about" className="py-24 bg-main-background">
      <div className="container mx-auto px-2">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-main-color text-sm font-black uppercase tracking-widest mb-4">
              {label}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold leading-tight">
              {title}{" "}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-6 text-xl leading-[1.7] text-low-color">
            {description1}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                number: "+500",
                label: "عميل راضٍ",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: <Award className="w-8 h-8" />,
                number: "10+",
                label: "سنة خبرة",
                color: "bg-amber-50 text-amber-600",
              },
              {
                icon: <Target className="w-8 h-8" />,
                number: "1000+",
                label: "مناسبة ناجحة",
                color: "bg-green-50 text-green-600",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                number: "100%",
                label: "رضا العملاء",
                color: "bg-red-50 text-red-600",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div
                  className={`size-16 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-black mb-2">{stat.number}</div>
                <div className="text-sm text-low-color font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
          <h4 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            قيمنا الأساسية
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "الأصالة",
                description:
                  "نحافظ على تقاليد الضيافة العربية الأصيلة مع دمجها بالاحترافية العصرية.",
              },
              {
                title: "الجودة",
                description:
                  "نلتزم بأعلى معايير الجودة في كل جانب من جوانب خدمتنا، من القهوة إلى الخدمة.",
              },
              {
                title: "التميز",
                description:
                  "نسعى للتميز في كل مناسبة، ونقدم تجربة فريدة تليق بضيوفك ومكانة مؤسستك.",
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="size-16 bg-main-color/10 rounded-full flex items-center justify-center text-main-color mx-auto mb-4">
                  <div className="text-2xl font-bold">{index + 1}</div>
                </div>
                <h5 className="text-xl font-bold mb-3">{value.title}</h5>
                <p className="text-low-color leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
