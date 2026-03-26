import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { SectionViewModel, SkillCategory } from "@/types/portfolio";

type SkillsSectionProps = {
  section: SectionViewModel<SkillCategory[]>;
};

export function SkillsSection({ section }: SkillsSectionProps) {
  return (
    <section className="border-y border-white/10 py-20 sm:py-24">
      <Container className="space-y-12">
        <SectionTitle
          eyebrow="Competências"
          title="Stack e capacidade de execução conectadas à operação real"
          description="As competências abaixo refletem o contexto já fornecido no workspace, organizadas em grupos para facilitar leitura técnica e posicionamento profissional."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {section.content.map((category) => (
            <article
              key={category.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {category.summary}
              </p>

              <ul className="mt-6 space-y-4">
                {category.items.map((item) => (
                  <li key={item.name} className="rounded-2xl bg-slate-950/70 p-4">
                    <p className="text-sm font-semibold text-slate-100">{item.name}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
