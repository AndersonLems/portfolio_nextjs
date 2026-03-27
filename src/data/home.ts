import { getProjectsSectionContent } from "@/data/projects";
import type { SectionViewModel } from "@/types/portfolio";
import type { ProjectsSectionContent } from "@/types/project";
import type { ProjectCarouselItem } from "@/types/home";

const DEFAULT_PROJECT_PREVIEW_COUNT = 3;

export function getHomeProjectsPreview(
  count: number = DEFAULT_PROJECT_PREVIEW_COUNT,
): SectionViewModel<ProjectsSectionContent> {
  const highlightedProjects = getProjectsSectionContent({});

  return {
    ...highlightedProjects,
    content: {
      ...highlightedProjects.content,
      items: highlightedProjects.content.items.slice(0, count),
      total: Math.min(count, highlightedProjects.content.items.length),
    },
  };
}

export function getHomeProjectCarouselItems(): ProjectCarouselItem[] {
  const items = getProjectsSectionContent({}).content.items;
  const featured = items.filter((item) => item.featured);
  const selected = featured.length > 0 ? featured : items.slice(0, 3);

  return selected.map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    category: item.category,
    status: item.status,
    stack: item.stack,
    highlights: item.highlights,
    linkHref: `/portfolio/projetos/${item.slug}`,
  }));
}
