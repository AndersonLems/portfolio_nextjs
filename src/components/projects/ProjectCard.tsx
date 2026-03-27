import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { ProjectCardViewModel } from "@/types/project";

type ProjectCardProps = {
  project: ProjectCardViewModel;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col justify-between rounded-[2rem] border border-border/70 bg-card/82 p-5 shadow-none sm:p-6 sm:shadow-[0_24px_60px_-44px_rgba(0,0,0,0.72)]",
        project.featured && "lg:col-span-2",
      )}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent">{project.category}</Badge>
          <Badge variant={project.status === "Em evolução" ? "success" : "default"}>
            {project.status}
          </Badge>
          {project.isTemplate ? <Badge variant="muted">Modelo inicial</Badge> : null}
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground sm:text-xl">
            {project.title}
          </h3>
          <p className="text-sm leading-7 text-muted-foreground line-clamp-3">
            {project.summary}
          </p>
        </div>

        <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
          {project.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Badge key={item} variant="muted">
              {item}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Button href={`/portfolio/projetos/${project.slug}`} variant="secondary">
          Ver detalhe do case
        </Button>
      </div>
    </article>
  );
}
