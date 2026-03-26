import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { formatProjectCount } from "@/lib/utils/format";
import type { SectionViewModel } from "@/types/portfolio";
import type { ProjectsSectionContent } from "@/types/project";

type ProjectsSectionProps = {
  section: SectionViewModel<ProjectsSectionContent>;
  showFilters?: boolean;
};

export function ProjectsSection({
  section,
  showFilters = true,
}: ProjectsSectionProps) {
  const { content } = section;

  return (
    <section className="py-20 sm:py-24">
      <Container className="space-y-10">
        <SectionTitle
          eyebrow="Projetos"
          title={content.title}
          description={content.intro}
        />

        <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
          <p>{formatProjectCount(content.total)}</p>
          <p>Filtros persistidos por query string.</p>
        </div>

        {showFilters ? (
          <ProjectFilters
            categories={content.availableCategories}
            statuses={content.availableStatuses}
            selectedCategory={content.selectedCategory}
            selectedStatus={content.selectedStatus}
          />
        ) : null}

        <div className="grid gap-6 lg:grid-cols-3">
          {content.items.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
