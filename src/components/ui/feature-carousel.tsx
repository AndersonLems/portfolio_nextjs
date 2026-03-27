"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectCarouselItem } from "@/types/home";

type FeatureCarouselProps = {
  items: ProjectCarouselItem[];
  className?: string;
  compact?: boolean;
};

export function FeatureCarousel({
  items,
  className,
  compact = false,
}: FeatureCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeItems = items.filter(Boolean);

  useEffect(() => {
    if (safeItems.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeItems.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [safeItems.length]);

  if (safeItems.length === 0) {
    return null;
  }

  const normalizedIndex = activeIndex % safeItems.length;
  const current = safeItems[normalizedIndex];

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border/70 bg-card p-6 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.86)] md:p-8",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.016),transparent_24%),radial-gradient(circle_at_top_left,rgba(207,142,165,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(106,143,130,0.05),transparent_40%)]" />

      <div
        className={cn(
          "relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center",
          compact && "lg:grid-cols-[1.05fr_0.95fr]",
        )}
      >
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent">Projeto em destaque</Badge>
            <Badge variant="muted">{current.category}</Badge>
            <Badge variant={current.status === "Em evolução" ? "success" : "default"}>
              {current.status}
            </Badge>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {current.title}
            </h3>
            <p className="text-base leading-8 text-muted-foreground">
              {current.summary}
            </p>
          </div>

          <ul className="grid gap-3 text-sm text-muted-foreground">
            {current.highlights.slice(0, 3).map((highlight) => (
              <li
                key={highlight}
                className="rounded-2xl border border-border/70 bg-muted/72 px-4 py-3 text-foreground/86"
              >
                {highlight}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {current.stack.slice(0, 6).map((item) => (
              <Badge key={item} variant="muted">
                {item}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button href={current.linkHref}>Ver case</Button>
            <Button href="/portfolio/projetos" variant="secondary">
              Ver todos os projetos
            </Button>
          </div>
        </div>

        <div className="grid gap-4 rounded-[1.75rem] border border-border/70 bg-muted/74 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-border/70 bg-card/70 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Arquitetura aplicada
              </p>
              <div className="mt-4 grid gap-3">
                {current.stack.slice(0, 4).map((item, index) => (
                  <div
                    key={item}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-sm font-medium text-foreground",
                      index % 2 === 0
                        ? "border-primary/22 bg-primary/8"
                        : "border-secondary/22 bg-secondary/10",
                    )}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border/70 bg-card/70 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Navegação
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((currentIndex) =>
                      currentIndex === 0 ? safeItems.length - 1 : currentIndex - 1,
                    )
                  }
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground transition hover:border-primary/28 hover:bg-card"
                  aria-label="Projeto anterior"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((currentIndex) =>
                      (currentIndex + 1) % safeItems.length,
                    )
                  }
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground transition hover:border-primary/28 hover:bg-card"
                  aria-label="Próximo projeto"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Navegação rotativa entre os principais cases do portfólio.
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            {safeItems.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left transition",
                  index === normalizedIndex
                    ? "border-border/80 bg-background text-foreground"
                    : "border-border/70 bg-card text-muted-foreground hover:border-primary/22 hover:bg-background hover:text-foreground",
                )}
                aria-pressed={index === normalizedIndex}
              >
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em]">
                  {item.category}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
