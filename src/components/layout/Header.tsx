"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/types/portfolio";
import { Container } from "./Container";

type HeaderProps = {
  items: NavItem[];
};

export function Header({ items }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <Container className="flex min-h-18 items-center justify-between gap-6 py-4">
        <div>
          <Link
            href="/portfolio"
            className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-100"
          >
            Anderson Lemos
          </Link>
          <p className="mt-1 text-xs text-slate-400">
            Redes, infraestrutura, automação e desenvolvimento
          </p>
        </div>

        <nav aria-label="Navegação principal">
          <ul className="flex flex-wrap items-center justify-end gap-2">
            {items.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex rounded-full border px-4 py-2 text-sm transition",
                      isActive
                        ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                        : "border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
