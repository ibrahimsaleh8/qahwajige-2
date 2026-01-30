import { AboutUsSection } from "@/components/AboutUsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { CurrentProjectId } from "@/lib/ProjectId";
import { ProjectContentResponse } from "@/lib/responseType";
import { getProjectContent } from "@/server-actions/main-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let data;

  try {
    data = (await getProjectContent(
      CurrentProjectId,
    )) as ProjectContentResponse;
  } catch (error) {
    console.error("Failed to fetch project content:", error);

    data = {
      header: { brandName: "قهوجيين الرياض" },
      hero: { headline: "", subheadline: "", whatsApp: "" },
      about: { label: "", title: "", description1: "", image: "" },
      services: { label: "", title: "", description: "", items: [] },
      whyUs: { label: "", title: "", description: "", features: [] },
      gallery: [],
      footer: {
        brandName: "قهوجيين الرياض",
        phone: "",
        email: "",
        address: "",
      },
    };
  }
  return (
    <div>
      <Header brandName={data.header.brandName} phone={data.footer.phone} />
      <HeroSection {...data.hero} image={data.about.image} />
      <AboutUsSection {...data.about} />
      <ServicesSection {...data.services} />

      <GallerySection gallery={data.gallery} />
      <ContactSection {...data.footer} whatsapp={data.hero?.whatsApp ?? ""} />
      <Footer {...data.footer} description={data.hero?.subheadline} />
    </div>
  );
}
