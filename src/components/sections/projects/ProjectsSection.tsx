import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import { FeatureCarousel } from "@/components/ui/feature-carousel";
import { formatProjectCount } from "@/lib/utils/format";
import type { SectionViewModel } from "@/types/portfolio";
import type { ProjectCarouselItem } from "@/types/home";
import type { ProjectsSectionContent } from "@/types/project";

type ProjectsSectionProps = {
  section: SectionViewModel<ProjectsSectionContent>;
  showFilters?: boolean;
  carouselItems?: ProjectCarouselItem[];
  variant?: "home" | "page";
};

export function ProjectsSection({
  section,
  showFilters = true,
  carouselItems,
  variant = "page",
}: ProjectsSectionProps) {
  const { content } = section;
  const featuredProjects =
    carouselItems && carouselItems.length > 0
      ? carouselItems
      : content.items
          .filter((item) => item.featured)
          .slice(0, 4)
          .map((item) => ({
            slug: item.slug,
            title: item.title,
            summary: item.summary,
            category: item.category,
            status: item.status,
            stack: item.stack,
            highlights: item.highlights,
            linkHref: `/portfolio/projetos/${item.slug}`,
          }));

  const projectFeatureItems = content.items.slice(0, 5).map((item) => ({
    title: item.title,
    description: item.highlights[0] ?? item.summary,
    meta: `${item.category} • ${item.status}`,
  }));

  return (
    <section id="projetos" className="py-16 sm:py-20 lg:py-24">
      <Container className="space-y-10">
        <SectionTitle
          eyebrow="Projetos"
          title={
            variant === "home"
              ? "Cases com contexto técnico, operação real e execução incremental"
              : content.title
          }
          description={
            variant === "home"
              ? "Projetos em destaque do portfólio, com foco em arquitetura, stack e capacidade de entrega."
              : content.intro
          }
        />

        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{formatProjectCount(content.total)}</p>
        </div>

        <FeatureCarousel
          items={featuredProjects}
          compact={variant === "home"}
        />

        {variant === "home" ? (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-border/70 bg-card px-5 py-4 sm:px-6 sm:py-5">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
                Exploração completa
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                Deseja ver mais projetos?
              </p>
            </div>
            <Button href="/portfolio/projetos" variant="secondary" size="lg">
              Ver todos os projetos
            </Button>
          </div>
        ) : null}

        {showFilters ? (
          <ProjectFilters
            categories={content.availableCategories}
            statuses={content.availableStatuses}
            selectedCategory={content.selectedCategory}
            selectedStatus={content.selectedStatus}
          />
        ) : null}

        {variant === "page" ? (
          <>
            <div className="space-y-4">
              <SectionTitle
                eyebrow="Recortes técnicos"
                title="Arquitetura, stack e contexto operacional dos principais cases"
                description="Um panorama rápido dos projetos com foco em organização técnica, troubleshooting, integração e evolução incremental."
              />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {projectFeatureItems.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.75rem] border border-border/70 bg-card p-5"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                      {item.meta}
                    </p>
                    <p className="mt-4 text-base font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.items.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </>
        ) : null}
      </Container>
    </section>
  );
}
