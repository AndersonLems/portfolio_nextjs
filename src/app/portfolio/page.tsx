import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";
import { SkillsSection } from "@/components/sections/skills/SkillsSection";
import { Button } from "@/components/ui/Button";
import { getProjectsSectionContent } from "@/data/projects";
import { siteContent } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Página principal do portfólio técnico de Anderson Lemos com destaque para atuação em redes, infraestrutura e automação.",
};

export default function PortfolioHomePage() {
  const highlightedProjects = getProjectsSectionContent({});
  const previewProjects = {
    ...highlightedProjects,
    content: {
      ...highlightedProjects.content,
      items: highlightedProjects.content.items.slice(0, 3),
      total: Math.min(3, highlightedProjects.content.items.length),
    },
  };

  return (
    <main>
      <HeroSection section={siteContent.hero} />
      <SkillsSection section={siteContent.skills} />
      <AboutSection section={siteContent.about} />
      <ProjectsSection section={previewProjects} showFilters={false} />

      <section className="pb-20 sm:pb-24">
        <Container className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center sm:p-12">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
            Próximo passo
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">
            Quer ver os detalhes dos cases ou iniciar uma conversa?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-400">
            A navegação completa está organizada por área do portfólio. Você pode
            explorar os projetos em profundidade ou seguir para a página de contato.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/portfolio/projetos">Explorar projetos</Button>
            <Button href="/portfolio/contato" variant="secondary">
              Ir para contato
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
