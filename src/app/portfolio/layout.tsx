import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/ui/footer";
import { Header3 } from "@/components/ui/header-3";
import { siteConfig, siteContent, siteNavigation } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Área principal do portfólio técnico de Anderson Lemos com foco em redes, infraestrutura, automação e desenvolvimento.",
};

export default function PortfolioLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Header3
        items={siteNavigation}
        brand={siteConfig.author}
        subtitle="Infraestrutura, redes e desenvolvimento"
      />
      {children}
      <Footer
        author={siteConfig.author}
        description={siteConfig.description}
        navigation={siteNavigation}
        contactLinks={siteContent.contact.content.channels}
      />
    </div>
  );
}
