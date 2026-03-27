import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { ProjectDetailViewModel } from "@/types/project";

type ProjectDetailSectionProps = {
  project: ProjectDetailViewModel;
};

export function ProjectDetailSection({ project }: ProjectDetailSectionProps) {
  return (
    <section className="py-20 sm:py-24">
      <Container className="space-y-10">
        <Link
          href="/portfolio/projetos"
          className="inline-flex text-sm text-primary transition hover:text-primary/80"
        >
          ← Voltar para projetos
        </Link>

        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent">{project.category}</Badge>
            <Badge variant={project.status === "Em evolução" ? "success" : "default"}>
              {project.status}
            </Badge>
            {project.isTemplate ? <Badge variant="muted">Modelo inicial</Badge> : null}
          </div>

          <SectionTitle title={project.title} description={project.summary} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <article className="rounded-[2rem] border border-border/70 bg-card/82 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                Visão geral
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {project.overview}
              </p>
            </article>

            <article className="rounded-[2rem] border border-border/70 bg-card/82 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                Problema
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {project.problem}
              </p>
            </article>

            <article className="rounded-[2rem] border border-border/70 bg-card/82 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                Solução
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {project.solution}
              </p>
            </article>
          </div>

          <div className="space-y-6">
            <article className="rounded-[2rem] border border-border/70 bg-card/82 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Resultados
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                {project.results.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-[2rem] border border-border/70 bg-card/82 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Destaques
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-[2rem] border border-border/70 bg-card/82 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Stack
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Badge key={item} variant="muted">
                    {item}
                  </Badge>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-border/70 bg-card/82 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Links
              </p>
              {project.links.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <Button key={link.href} href={link.href} variant="secondary">
                      {link.label}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Este case ainda não possui links públicos. Quando houver conteúdo
                  real disponível, os links serão substituídos.
                </p>
              )}
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
