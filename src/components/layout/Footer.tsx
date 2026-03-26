import { siteConfig } from "@/data/site";
import { Container } from "./Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <Container className="flex flex-col gap-3 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>
          © {currentYear} {siteConfig.author}
        </p>
        <p>
          Portfólio técnico em Next.js 16, TypeScript e Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
