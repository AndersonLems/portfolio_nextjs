"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/portfolio";

type Header3Props = {
  items: NavItem[];
  brand: string;
  subtitle: string;
};

export function Header3({ items, brand, subtitle }: Header3Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(10);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300",
        scrolled &&
          "border-border/80 bg-background/93 backdrop-blur supports-[backdrop-filter]:bg-background/88",
      )}
    >
      <Container className="relative flex h-[4.2rem] items-center justify-between gap-3 sm:h-[4.6rem]">
        <div className="flex min-w-0 items-center">
          <Link
            href="/portfolio"
            className="flex h-11 flex-col justify-center rounded-[1.2rem] border border-border/70 bg-card px-3 transition hover:border-primary/30 hover:bg-card/96 sm:px-4"
          >
            <span className="block font-mono text-[9px] font-medium uppercase tracking-[0.34em] text-primary sm:text-[10px]">
              {brand}
            </span>
            <span className="mt-1 block max-w-[10rem] truncate text-[9px] uppercase tracking-[0.22em] text-muted-foreground sm:max-w-none sm:text-[10px] sm:tracking-[0.24em]">
              {subtitle}
            </span>
          </Link>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 md:flex md:items-center">
          <nav
            className="pointer-events-auto flex h-11 items-center"
            aria-label="Navegação principal"
          >
            <ul className="flex h-11 items-center gap-1 rounded-full border border-border/70 bg-card/88 p-1">
              {items.map((item) => {
                const baseHref = item.href.split("#")[0] ?? item.href;
                const isActive =
                  baseHref === "/portfolio"
                    ? pathname === "/portfolio"
                    : pathname === baseHref ||
                      pathname.startsWith(`${baseHref}/`);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition",
                        isActive
                          ? "border border-border/80 bg-background text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                          : "border border-transparent text-muted-foreground hover:border-border/60 hover:bg-background/60 hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <Button
          size="icon"
          variant="secondary"
          onClick={() => setOpen((current) => !current)}
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Abrir navegação"
        >
          <MenuToggleIcon open={open} className="size-5" duration={280} />
        </Button>
      </Container>

      <MobileMenu open={open}>
        <div className="space-y-6">
          <div className="rounded-[1.5rem] border border-border/70 bg-card p-4 sm:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary sm:text-[11px]">
              {brand}
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {subtitle}
            </p>
          </div>

          <nav aria-label="Navegação móvel">
            <ul className="grid gap-2">
              {items.map((item) => {
                const baseHref = item.href.split("#")[0] ?? item.href;
                const isActive =
                  baseHref === "/portfolio"
                    ? pathname === "/portfolio"
                    : pathname === baseHref ||
                      pathname.startsWith(`${baseHref}/`);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block min-h-12 rounded-[1.25rem] border px-4 py-3 text-sm font-medium transition",
                        isActive
                          ? "border-border/80 bg-background text-foreground"
                          : "border-border/60 bg-card text-foreground hover:border-primary/20 hover:bg-background/88",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="rounded-[1.5rem] border border-border/70 bg-card p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:text-[11px]">
            Navegação
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Navegue pelo meu portfólio técnico para conhecer minhas
            especialidades, projetos e trajetória profissional.
          </p>
        </div>
      </MobileMenu>
    </header>
  );
}

type MobileMenuProps = {
  open: boolean;
  children: React.ReactNode;
};

function MobileMenu({ open, children }: MobileMenuProps) {
  if (!open || typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <div
      id="mobile-menu"
      className="fixed inset-x-0 bottom-0 top-[4.2rem] z-40 border-t border-border/70 bg-background/96 p-4 md:top-[4.6rem] md:hidden md:backdrop-blur-md"
    >
      <div className="flex h-full flex-col justify-between gap-6 overflow-y-auto rounded-[1.5rem] border border-border/70 bg-muted/70 p-4 sm:rounded-[1.75rem]">
        {children}
      </div>
    </div>,
    document.body,
  );
}

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return scrolled;
}
