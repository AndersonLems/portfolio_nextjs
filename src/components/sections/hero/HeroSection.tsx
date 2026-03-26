import { Button } from "@/components/ui/Button";
import type { HeroContent, SectionViewModel } from "@/types/portfolio";
import { Container } from "@/components/layout/Container";

type HeroSectionProps = {
  section: SectionViewModel<HeroContent>;
};

export function HeroSection({ section }: HeroSectionProps) {
  const { content } = section;

  return (
    <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.95),_transparent_45%)]" />
      <Container className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            {content.eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {content.name}
          </h1>
          <p className="max-w-3xl text-xl text-slate-200">{content.role}</p>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            {content.location}
          </p>
          <p className="max-w-3xl text-base leading-8 text-slate-400">
            {content.summary}
          </p>

          <div className="flex flex-wrap gap-3">
            {content.ctas.map((cta) => (
              <Button
                key={cta.href}
                href={cta.href}
                variant={cta.variant === "secondary" ? "secondary" : "primary"}
              >
                {cta.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Destaques técnicos
          </p>
          <ul className="mt-6 space-y-4">
            {content.highlights.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-slate-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
