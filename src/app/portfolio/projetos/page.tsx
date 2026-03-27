import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";
import { getProjectsSectionContent } from "@/data/projects";

type ProjectsPageProps = {
  searchParams: Promise<{
    category?: string;
    status?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Listagem de projetos e cases técnicos com filtros por categoria e status.",
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const section = getProjectsSectionContent(params);

  return (
    <main>
      <ProjectsSection section={section} variant="page" />
    </main>
  );
}
