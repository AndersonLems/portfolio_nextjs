import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { Source_Sans_3, DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const dmSansHeading = DM_Sans({subsets:['latin'],variable:'--font-heading'});

const sourceSans3 = Source_Sans_3({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.author}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.description,
    type: "website",
    locale: siteConfig.locale,
    url: "/portfolio",
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={cn("scroll-smooth", "font-sans", sourceSans3.variable, dmSansHeading.variable)}>
      <body>{children}</body>
    </html>
  );
}
