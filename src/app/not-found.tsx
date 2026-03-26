import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center">
      <Container className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">
          Página não encontrada
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-400">
          A rota solicitada não existe neste portfólio. Volte para a área principal
          do projeto e continue a navegação a partir de lá.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/portfolio" variant="primary">
            Ir para o portfólio
          </Button>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Se você esperava um projeto específico, confira a listagem em{" "}
          <Link className="text-cyan-300" href="/portfolio/projetos">
            /portfolio/projetos
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
