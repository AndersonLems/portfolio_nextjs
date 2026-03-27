"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import type { HeroContent } from "@/types/portfolio";

type ModernAnimatedHeroSectionProps = {
  content: HeroContent;
};

type ScrambledRoleProps = {
  phrases: string[];
  className?: string;
};

type AnimatedSignalPanelProps = {
  content: HeroContent;
  className?: string;
};

type Character = {
  id: string;
  char: string;
  x: number;
  y: number;
  delay: number;
};

type QueueItem = {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
};

const CHARACTER_SET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

class TextScramble {
  private readonly el: HTMLElement;
  private readonly chars = "!<>-_\\/[]{}=+*^?#";
  private queue: QueueItem[] = [];
  private frame = 0;
  private frameRequest = 0;
  private resolve: (() => void) | null = null;

  constructor(el: HTMLElement) {
    this.el = el;
    this.update = this.update.bind(this);
  }

  setText(nextText: string) {
    const previousText = this.el.innerText;
    const length = Math.max(previousText.length, nextText.length);

    this.queue = [];
    for (let index = 0; index < length; index += 1) {
      const from = previousText[index] ?? "";
      const to = nextText[index] ?? "";
      const start = Math.floor(Math.random() * 10);
      const end = start + Math.floor(Math.random() * 10) + 6;
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;

    return new Promise<void>((resolve) => {
      this.resolve = resolve;
      this.update();
    });
  }

  destroy() {
    cancelAnimationFrame(this.frameRequest);
    this.resolve = null;
  }

  private update() {
    let output = "";
    let complete = 0;

    for (let index = 0; index < this.queue.length; index += 1) {
      const item = this.queue[index];

      if (this.frame >= item.end) {
        complete += 1;
        output += item.to;
        continue;
      }

      if (this.frame >= item.start) {
        if (!item.char || Math.random() < 0.28) {
          item.char = this.chars[Math.floor(Math.random() * this.chars.length)];
        }
        output += `<span class=\"hero-dud\">${item.char}</span>`;
        continue;
      }

      output += item.from;
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve?.();
      return;
    }

    this.frame += 1;
    this.frameRequest = requestAnimationFrame(this.update);
  }
}

function createCharacters(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: `char-${index}`,
    char: CHARACTER_SET[Math.floor(Math.random() * CHARACTER_SET.length)],
    x: 8 + Math.random() * 84,
    y: 10 + Math.random() * 80,
    delay: Math.random() * 4,
  }));
}

export function ScrambledRole({ phrases, className }: ScrambledRoleProps) {
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || phrases.length === 0) {
      return;
    }

    const scrambler = new TextScramble(element);
    let disposed = false;
    let index = 0;
    let timeoutId: number | null = null;

    const loop = () => {
      if (disposed) {
        return;
      }

      void scrambler.setText(phrases[index]).then(() => {
        if (disposed) {
          return;
        }

        timeoutId = window.setTimeout(loop, 2200);
      });

      index = (index + 1) % phrases.length;
    };

    loop();

    return () => {
      disposed = true;
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      scrambler.destroy();
    };
  }, [phrases]);

  return (
    <p
      ref={elementRef}
      className={className ?? "min-h-[3.25rem] font-mono text-lg text-foreground sm:text-xl"}
    >
      {phrases[0] ?? ""}
    </p>
  );
}

export function AnimatedSignalPanel({
  content,
  className,
}: AnimatedSignalPanelProps) {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const syncCharacters = () => {
      const isCompact = window.innerWidth < 1024;
      setCharacters(createCharacters(isCompact ? 24 : 42));
    };

    syncCharacters();
    window.addEventListener("resize", syncCharacters);

    return () => window.removeEventListener("resize", syncCharacters);
  }, []);

  useEffect(() => {
    if (characters.length === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const next = Array.from(
        { length: Math.min(6, Math.max(2, Math.floor(characters.length / 8))) },
        () => Math.floor(Math.random() * characters.length),
      );
      setActiveIndices(next);
      setCharacters((current) =>
        current.map((item, index) =>
          next.includes(index)
            ? {
                ...item,
                char:
                  CHARACTER_SET[
                    Math.floor(Math.random() * CHARACTER_SET.length)
                  ],
              }
            : item,
        ),
      );
    }, 360);

    return () => window.clearInterval(intervalId);
  }, [characters.length]);

  return (
    <div
      className={
        className ??
        "relative overflow-hidden rounded-[2rem] border border-border/70 bg-card p-6 shadow-[0_24px_64px_-52px_rgba(0,0,0,0.78)]"
      }
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_26%),radial-gradient(circle_at_top_left,rgba(207,142,165,0.10),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(106,143,130,0.08),transparent_42%)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {characters.map((item, index) => {
          const isActive = activeIndices.includes(index);

          return (
            <span
              key={item.id}
              aria-hidden="true"
              className="absolute font-mono text-sm transition-all duration-200"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                opacity: isActive ? 0.72 : 0.16,
                transform: `translate(-50%, -50%) scale(${isActive ? 1.08 : 0.92})`,
                color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                animation: `hero-float 6s ease-in-out ${item.delay}s infinite`,
              }}
            >
              {item.char}
            </span>
          );
        })}
      </div>

      <div className="relative grid gap-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
              Operação ativa
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">
              Painel técnico
            </h2>
          </div>
          <Badge variant="muted">Live</Badge>
        </div>

        <div className="grid gap-4 rounded-[1.5rem] border border-border/70 bg-muted/72 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <Metric label="Foco" value={content.role} />
            <Metric label="Base" value={content.location} />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {content.highlights.slice(0, 3).map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border/70 bg-card p-4"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Highlight
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/70 p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-foreground">{value}</p>
    </div>
  );
}

export function ModernAnimatedHeroSection({
  content,
}: ModernAnimatedHeroSectionProps) {
  const phrases = [content.role, ...content.highlights.slice(0, 2), content.location];

  return (
    <section className="section-surface relative overflow-hidden border-b border-border/60 py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_26%),radial-gradient(circle_at_top_left,rgba(207,142,165,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(106,143,130,0.05),transparent_38%)]" />

      <Container className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-7 lg:pr-10">
          <Badge variant="accent" className="px-4 py-1.5">
            {content.eyebrow}
          </Badge>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[4.2rem] lg:leading-[1.02]">
              {content.name}
            </h1>
            <ScrambledRole
              phrases={phrases}
              className="min-h-[3.9rem] max-w-3xl font-mono text-lg text-foreground sm:text-xl lg:text-[1.32rem]"
            />
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              {content.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {content.ctas.map((cta) => (
              <Button
                key={cta.href}
                href={cta.href}
                size="lg"
                variant={cta.variant === "secondary" ? "secondary" : "primary"}
              >
                {cta.label}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {content.highlights.slice(0, 5).map((item) => (
              <span
                key={item}
                className="inline-flex rounded-full border border-border/70 bg-card/78 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <AnimatedSignalPanel
          content={content}
          className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/86 p-6 shadow-[0_28px_70px_-56px_rgba(0,0,0,0.78)]"
        />
      </Container>
    </section>
  );
}
