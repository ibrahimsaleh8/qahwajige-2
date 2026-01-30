"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toast } from "@/app/(Dashboard)/_components/Toast";
import {
  BriefcaseBusiness,
  CalendarDays,
  Medal,
  Coffee,
  Users,
  Heart,
  Building2,
  LucideIcon,
} from "lucide-react";

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  updatedAt: string;
}

interface ServicesSection {
  id: string;
  label: string;
  title: string;
  description: string;
  services: Service[];
}

interface ServicesFormProps {
  projectId: string;
  servicesSection: ServicesSection;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  BriefcaseBusiness,
  CalendarDays,
  Medal,
  Coffee,
  Users,
  Heart,
  Building2,
};

export default function ServicesForm({
  projectId,
  servicesSection,
}: ServicesFormProps) {
  // Section form state
  const [sectionData, setSectionData] = useState({
    label: servicesSection.label,
    title: servicesSection.title,
    description: servicesSection.description,
  });

  // Services cards state
  const [services, setServices] = useState<Service[]>(servicesSection.services);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingOperation, setLoadingOperation] = useState<
    "section" | "service" | null
  >(null);

  // --- Handlers ---
  const handleSectionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSectionData({ ...sectionData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (
    serviceId: string,
    field: keyof Service,
    value: string,
  ) => {
    setServices(
      services.map((s) => (s.id === serviceId ? { ...s, [field]: value } : s)),
    );
  };

  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingOperation("section");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard/${projectId}/update-services`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sectionData),
        },
      );
      if (res.ok)
        Toast({ icon: "success", message: "تم حفظ بيانات القسم بنجاح" });
      else {
        const errorData = await res.json().catch(() => null);
        Toast({
          icon: "error",
          message: errorData?.message || "حدث خطأ أثناء الحفظ",
        });
      }
    } catch (err) {
      console.error(err);
      Toast({ icon: "error", message: "حدث خطأ أثناء الحفظ" });
    } finally {
      setIsLoading(false);
      setLoadingOperation(null);
    }
  };

  const handleSaveService = async (serviceId: string) => {
    setIsLoading(true);
    setLoadingOperation("service");

    // Find the service to update
    const serviceToUpdate = services.find((s) => s.id === serviceId);
    if (!serviceToUpdate) {
      setIsLoading(false);
      setLoadingOperation(null);
      return;
    }

    // Destructure and make sure all required fields exist
    const { title, description, icon } = serviceToUpdate;

    if (!title || !description || !icon) {
      Toast({ icon: "error", message: "جميع الحقول مطلوبة" });
      setIsLoading(false);
      setLoadingOperation(null);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard/${projectId}/update-service`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceId,
            title,
            description,
            icon,
          }),
        },
      );

      if (res.ok) {
        const data = await res.json();
        if (data.data?.service) {
          setServices(
            services.map((s) =>
              s.id === serviceId ? { ...s, ...data.data.service } : s,
            ),
          );
        }
        Toast({ icon: "success", message: "تم حفظ الخدمة بنجاح" });
        setEditingServiceId(null);
      } else {
        const errorData = await res.json().catch(() => null);
        Toast({
          icon: "error",
          message: errorData?.message || "حدث خطأ أثناء الحفظ",
        });
      }
    } catch (err) {
      console.error(err);
      Toast({ icon: "error", message: "حدث خطأ أثناء الحفظ" });
    } finally {
      setIsLoading(false);
      setLoadingOperation(null);
    }
  };

  const handleCancelEdit = (serviceId: string) => {
    const original = servicesSection.services.find((s) => s.id === serviceId);
    if (original)
      setServices(services.map((s) => (s.id === serviceId ? original : s)));
    setEditingServiceId(null);
  };

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon className="w-12 h-12" /> : null;
  };

  return (
    <div className="space-y-8">
      {/* Section Form */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-2xl font-semibold">معلومات قسم الخدمات</h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleSaveSection} className="flex flex-col gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="label"
                  className="block mb-2 font-medium text-gray-700">
                  التصنيف
                </label>
                <Input
                  id="label"
                  name="label"
                  type="text"
                  placeholder="عنوان صغير للقسم"
                  value={sectionData.label}
                  onChange={handleSectionChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 font-medium text-gray-700">
                  العنوان الرئيسي
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="عنوان رئيسي للقسم"
                  value={sectionData.title}
                  onChange={handleSectionChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 font-medium text-gray-700">
                  الوصف
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="وصف قسم الخدمات"
                  value={sectionData.description}
                  onChange={handleSectionChange}
                  disabled={isLoading}
                  rows={4}
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-40">
              {loadingOperation === "section"
                ? "جاري الحفظ..."
                : "حفظ التغييرات"}
            </Button>
          </form>
        </div>
      </div>

      {/* Editable Modern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {services.map((service) => {
          const isEditing = editingServiceId === service.id;
          const isThisServiceLoading = isLoading && isEditing;

          return (
            <div
              key={service.id}
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-main-color/10">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-xl bg-main-color/10 group-hover:bg-main-color group-hover:text-white transition-colors">
                  {getIcon(service.icon)}
                </div>
              </div>

              {isEditing ? (
                <>
                  <Input
                    value={service.title}
                    onChange={(e) =>
                      handleServiceChange(service.id, "title", e.target.value)
                    }
                    className="text-xl font-bold mb-3"
                    disabled={isThisServiceLoading}
                  />

                  <Textarea
                    value={service.description}
                    onChange={(e) =>
                      handleServiceChange(
                        service.id,
                        "description",
                        e.target.value,
                      )
                    }
                    rows={4}
                    className="mb-3"
                    disabled={isThisServiceLoading}
                  />

                  <select
                    value={service.icon}
                    onChange={(e) =>
                      handleServiceChange(service.id, "icon", e.target.value)
                    }
                    className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                    disabled={isThisServiceLoading}>
                    {Object.keys(iconMap).map((iconKey) => (
                      <option key={iconKey} value={iconKey}>
                        {iconKey}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleSaveService(service.id)}
                      size="sm"
                      className="flex-1"
                      disabled={isThisServiceLoading}>
                      {isThisServiceLoading ? "جاري الحفظ..." : "حفظ"}
                    </Button>
                    <Button
                      onClick={() => handleCancelEdit(service.id)}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      disabled={isThisServiceLoading}>
                      إلغاء
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                  <p className="text-gray-500 mb-4 line-clamp-4">
                    {service.description}
                  </p>
                  <div className="h-1 w-12 bg-main-color rounded-full group-hover:w-full transition-all duration-500 mb-4" />
                  <Button
                    onClick={() => setEditingServiceId(service.id)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={isLoading}>
                    تعديل
                  </Button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
