import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { SkillsSection } from "@/components/sections/skills/SkillsSection";
import { siteContent } from "@/data/site";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Trajetória, formação, atuação atual, áreas de foco e stack técnica de Anderson Lemos.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutSection section={siteContent.about} />
      <SkillsSection section={siteContent.skills} />
    </main>
  );
}
