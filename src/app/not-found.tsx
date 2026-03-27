import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center">
      <Container className="rounded-[2rem] border border-border/70 bg-card/80 p-8 text-center sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-foreground">
          Página não encontrada
        </h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          A rota solicitada não existe neste portfólio. Volte para a área principal
          do projeto e continue a navegação a partir de lá.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/portfolio" variant="primary">
            Ir para o portfólio
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Se você esperava um projeto específico, confira a listagem em{" "}
          <Link className="text-primary" href="/portfolio/projetos">
            /portfolio/projetos
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
