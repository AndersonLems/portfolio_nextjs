import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import type { ProjectCardViewModel } from "@/types/project";

type ProjectCardProps = {
  project: ProjectCardViewModel;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm",
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
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          <p className="text-sm leading-7 text-slate-400">{project.summary}</p>
        </div>

        <ul className="space-y-2 text-sm leading-6 text-slate-300">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
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
