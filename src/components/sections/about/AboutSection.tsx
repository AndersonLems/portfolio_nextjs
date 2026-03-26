import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { AboutContent, SectionViewModel } from "@/types/portfolio";

type AboutSectionProps = {
  section: SectionViewModel<AboutContent>;
};

export function AboutSection({ section }: AboutSectionProps) {
  const { content } = section;

  return (
    <section className="py-20 sm:py-24">
      <Container className="space-y-12">
        <SectionTitle eyebrow="Sobre" title={content.title} description={content.intro} />

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-3">
            <h3 className="text-lg font-semibold text-white">Atuação atual</h3>
            <p className="mt-4 text-base leading-8 text-slate-400">
              {content.currentRole}
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Formação</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {content.education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Áreas de foco</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {content.focusAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Stack</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {content.stack.map((item) => (
                <Badge key={item} variant="muted">
                  {item}
                </Badge>
              ))}
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
