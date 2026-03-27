import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";
import { SkillsSection } from "@/components/sections/skills/SkillsSection";
import {
  getHomeProjectCarouselItems,
  getHomeProjectsPreview,
} from "@/data/home";
import { siteContent } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Página principal do portfólio técnico de Anderson Lemos com destaque para atuação em redes, infraestrutura e automação.",
};

export default function PortfolioHomePage() {
  const previewProjects = getHomeProjectsPreview();
  const carouselItems = getHomeProjectCarouselItems();

  return (
    <main>
      <HeroSection section={siteContent.hero} />
      <AboutSection section={siteContent.about} />
      <SkillsSection section={siteContent.skills} variant="home" />
      <ProjectsSection
        section={previewProjects}
        showFilters={false}
        carouselItems={carouselItems}
        variant="home"
      />
      <ContactSection section={siteContent.contact} variant="home" />
    </main>
  );
}
