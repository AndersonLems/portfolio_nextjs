import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { Poppins, Roboto_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

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
    <html
      lang="pt-BR"
      className={cn(
        "dark",
        "scroll-smooth",
        "font-sans",
        poppins.variable,
        robotoMono.variable,
      )}
    >
      <body>{children}</body>
    </html>
  );
}
