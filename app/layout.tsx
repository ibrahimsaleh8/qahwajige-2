// app/layout.tsx
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { CurrentProjectId } from "@/lib/ProjectId";
import { getProjectMetadata } from "@/server-actions/metatags";
import { StructuredData } from "@/components/StructuredData";

const cairoFont = Cairo({
  weight: ["1000", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["arabic"],
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getProjectMetadata(CurrentProjectId);

    const title = data.title || data.brandName || "قهوجيين الرياض";
    const description = data.description || "خدمات الضيافة العربية في الرياض";
    const brandName = data.brandName || "قهوجيين الرياض";
    const keywords = data.keywords || [brandName];

    return {
      title,
      description,
      keywords,
      creator: brandName,
      publisher: brandName,
      openGraph: {
        title,
        description,
        type: "website",
        locale: "ar_SA",
        siteName: brandName,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      alternates: {
        canonical: process.env.NEXT_PUBLIC_APP_URL,
      },
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return {
      title: "قهوجيين الرياض",
      description: "خدمات الضيافة العربية في الرياض",
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getProjectMetadata(CurrentProjectId);

  return (
    <html lang="ar" dir="rtl">
      <head>
        <StructuredData
          name={data.brandName || "قهوجيين الرياض"}
          description={data.description || "خدمات الضيافة العربية في الرياض"}
          url={process.env.NEXT_PUBLIC_APP_URL as string}
          phone={data.phone}
        />
      </head>
      <body className={`${cairoFont.className} antialiased`}>{children}</body>
    </html>
  );
}
