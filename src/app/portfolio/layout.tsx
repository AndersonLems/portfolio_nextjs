import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteNavigation } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Área principal do portfólio técnico de Anderson Lemos com foco em redes, infraestrutura, automação e desenvolvimento.",
};

export default function PortfolioLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <Header items={siteNavigation} />
      {children}
      <Footer />
    </div>
  );
}
