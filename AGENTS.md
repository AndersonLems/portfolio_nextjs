# AGENTS.md

## Objetivo

Manter e evoluir o portfólio técnico de Anderson Lemos em Next.js, TypeScript e Tailwind CSS, com foco em clareza arquitetural, boa componentização e validação completa antes de encerrar qualquer tarefa.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Convenções

- Usar App Router com código em `src/`
- Usar apenas TypeScript
- Estilizar apenas com Tailwind CSS
- Centralizar dados em `src/data`
- Centralizar tipos em `src/types`
- Manter transformação de dados fora de componentes React
- Usar decorators apenas em domínio/modelagem/infraestrutura
- Marcar qualquer conteúdo incompleto como `modelo inicial` ou `a preencher`

## Definição de pronto

- Rotas implementadas
- Tipagem consistente
- Sem código morto
- `npm run lint` passando
- `npm run build` passando

## Restrições

- Não inventar experiências profissionais
- Não usar CSS Modules ou bibliotecas visuais pesadas sem necessidade
- Não encerrar trabalho com erro pendente de lint ou build
