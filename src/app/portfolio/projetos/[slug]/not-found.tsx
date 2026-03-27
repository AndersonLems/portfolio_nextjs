import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export default function ProjectNotFound() {
  return (
    <main className="py-20 sm:py-24">
      <Container className="rounded-[2rem] border border-border/70 bg-card/80 p-8 text-center sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Projeto não encontrado
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-foreground">
          Este case não existe no repositório atual
        </h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          O slug solicitado não corresponde a nenhum projeto disponível no
          portfólio. Volte para a listagem e escolha um case válido.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/portfolio/projetos" variant="primary">
            Voltar para projetos
          </Button>
        </div>
      </Container>
    </main>
  );
}
