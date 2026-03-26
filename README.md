# Portfólio Técnico — Anderson Lemos

Portfólio pessoal construído com Next.js 16, TypeScript e Tailwind CSS para apresentar a atuação técnica de Anderson Lemos em redes, infraestrutura, automação e desenvolvimento.

## Stack

- Next.js 16 com App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## Estrutura principal

```text
src/
  app/
    api/contato/route.ts
    portfolio/
      layout.tsx
      page.tsx
      sobre/page.tsx
      projetos/page.tsx
      projetos/[slug]/page.tsx
      contato/page.tsx
  components/
  data/
  lib/
  types/
```

## Como rodar no Ubuntu

```bash
npm install
npm run dev
```

Para validação final:

```bash
npm run lint
npm run build
```

## Onde editar os dados do portfólio

- Dados institucionais e seções: `src/data/site.ts`
- Projetos e cases técnicos: `src/data/projects.ts`
- Tipos compartilhados: `src/types/`
- Validação do formulário: `src/lib/validators/contact.ts`

## Nota sobre decorators

Os decorators `@Measure()` e `@Sealed()` são usados apenas em classes e métodos de domínio/infraestrutura, nunca em componentes React. O projeto mantém `experimentalDecorators` habilitado no `tsconfig.json`.

## Convenções adotadas

- Estilização exclusivamente com Tailwind CSS
- Dados centralizados em `src/data`
- Transformação de dados fora dos componentes visuais
- Placeholders honestos marcados como `modelo inicial` ou `a preencher`
- Nenhuma experiência biográfica inventada além do contexto do workspace

## Próximos passos

- Substituir `siteConfig.baseUrl` por domínio real antes do deploy
- Preencher canais públicos reais de contato
- Trocar cases marcados como modelo inicial por projetos públicos finais, quando disponíveis
