import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { SectionViewModel, SkillCategory } from "@/types/portfolio";

type SkillsSectionProps = {
  section: SectionViewModel<SkillCategory[]>;
  variant?: "home" | "page";
};

export function SkillsSection({
  section,
  variant = "page",
}: SkillsSectionProps) {
  const title =
    variant === "home" ? "Especialidades e competências profissionais" : "";

  const description =
    variant === "home"
      ? "Algumas das especialidades e competências profissionais."
      : "";

  return (
    <section
      id="especialidades"
      className="section-surface border-y border-border/70 py-20 sm:py-24"
    >
      <Container className="space-y-12">
        <SectionTitle
          eyebrow="Especialidades"
          title={title}
          description={description}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {section.content.map((category) => (
            <article
              key={category.title}
              className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-[0_24px_50px_-44px_rgba(0,0,0,0.62)]"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                {category.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {category.summary}
              </p>

              <ul className="mt-6 space-y-4">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="rounded-[1.5rem] border border-border/70 bg-muted/74 p-4"
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
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
