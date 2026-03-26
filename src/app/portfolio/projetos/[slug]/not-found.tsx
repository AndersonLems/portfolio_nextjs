import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export default function ProjectNotFound() {
  return (
    <main className="py-20 sm:py-24">
      <Container className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Projeto não encontrado
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">
          Este case não existe no repositório atual
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-400">
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
