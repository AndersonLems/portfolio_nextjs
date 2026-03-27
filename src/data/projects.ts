import { Measure } from "@/lib/decorators/measure";
import { Sealed } from "@/lib/decorators/sealed";
import { formatLabelValue } from "@/lib/utils/format";
import type { SectionViewModel } from "@/types/portfolio";
import type {
  Project,
  ProjectCardViewModel,
  ProjectCategory,
  ProjectDetailViewModel,
  ProjectStatus,
  ProjectsSectionContent,
} from "@/types/project";

type ProjectFilters = {
  category?: string;
  status?: string;
};

@Sealed()
class ProjectModel {
  constructor(private readonly project: Project) {}

  get category() {
    return this.project.category;
  }

  get status() {
    return this.project.status;
  }

  get slug() {
    return this.project.slug;
  }

  @Measure("project:card-view-model")
  toCardViewModel(): ProjectCardViewModel {
    return {
      slug: this.project.slug,
      title: this.project.title,
      summary: this.project.summary,
      category: this.project.category,
      status: this.project.status,
      stack: this.project.stack,
      highlights: this.project.highlights,
      featured: this.project.featured,
      isTemplate: this.project.isTemplate,
    };
  }

  @Measure("project:detail-view-model")
  toDetailViewModel(): ProjectDetailViewModel {
    return {
      slug: this.project.slug,
      title: this.project.title,
      summary: this.project.summary,
      overview: this.project.overview,
      problem: this.project.problem,
      solution: this.project.solution,
      results: this.project.results,
      category: this.project.category,
      status: this.project.status,
      stack: this.project.stack,
      highlights: this.project.highlights,
      links: this.project.links,
      featured: this.project.featured,
      isTemplate: this.project.isTemplate,
    };
  }
}

@Sealed()
class ProjectRepository {
  constructor(private readonly items: ReadonlyArray<ProjectModel>) {}

  @Measure("projects:get-slugs")
  getProjectSlugs(): string[] {
    return this.items.map((item) => item.slug);
  }

  @Measure("projects:get-by-slug")
  getProjectBySlug(slug: string): ProjectDetailViewModel | null {
    const project = this.items.find((item) => item.slug === slug);

    return project ? project.toDetailViewModel() : null;
  }

  @Measure("projects:get-filtered")
  getFilteredProjects(filters: ProjectFilters): ProjectCardViewModel[] {
    const selectedCategory = formatLabelValue(filters.category ?? "all");
    const selectedStatus = formatLabelValue(filters.status ?? "all");

    return this.items
      .filter((item) => {
        const categoryMatches =
          selectedCategory === "all" ||
          formatLabelValue(item.category) === selectedCategory;
        const statusMatches =
          selectedStatus === "all" ||
          formatLabelValue(item.status) === selectedStatus;

        return categoryMatches && statusMatches;
      })
      .map((item) => item.toCardViewModel())
      .sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  @Measure("projects:categories")
  getCategories(): ProjectCategory[] {
    return Array.from(new Set(this.items.map((item) => item.category)));
  }

  @Measure("projects:statuses")
  getStatuses(): ProjectStatus[] {
    return Array.from(new Set(this.items.map((item) => item.status)));
  }
}

const rawProjects = [
  {
    slug: "radius-web",
    title: "Sistema gerenciamento de usuários e sessões Radius",
    summary:
      "Case técnico para gerenciamento de sessões PPP e envio de atributos radius para equipamentos concentradores",
    overview:
      "Este projeto é um modelo inicial para um sistema de gerenciamento de usuários e sessões PPP, com foco em integração com equipamentos de borda e suporte a operações críticas.",
    problem:
      "Em ambientes de provedores de internet, a gestão de sessões PPP e a comunicação eficiente com concentradores são essenciais, mas muitas vezes dependem de processos manuais ou soluções fragmentadas.",
    solution:
      "A proposta é criar um sistema de gerenciamento simples e intuitivo para gerenciar conexões PPP, enviar atributos Radius para equipamentos Mikrotik, Huawei e Cisco.",
    results: [
      "Plataforma funcional para gerenciamento de sessões PPP",
      "Integração inicial com equipamentos concentradores.",
      "Gerenciamento de usuários e sessões com mais controle e visibilidade",
    ],
    category: "Redes",
    status: "Case técnico",
    stack: [
      "JavaScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "PM2",
      "Linux",
      "FreeRadius",
      "EVE-NG",
    ],
    highlights: [
      "Facilidade de gerenciamento de sessões PPP",
      "Escalabilidade para ambiente multivendor",
      "Organização de dados técnicos para suporte e operação",
    ],
    featured: true,
    isTemplate: false,
    links: [
      { label: "GitHub", href: "https://github.com/AndersonLems/radius-web" },
    ],
  },
  {
    slug: "gerenciar-contas",
    title: "Sistema de controle financeiro",
    summary: "Case técnico para gerenciamentos de despesas e de receitas.",
    overview:
      "Pensado como interface analítica para consolidar dados financeiros em um único painel.",
    problem:
      "A gestão financeira pessoal ou de pequenos negócios pode ser prejudicada pela dispersão de dados entre diferentes ferramentas, planilhas e registros manuais, o que dificulta a análise e o controle efetivo.",
    solution:
      "A proposta é criar uma plataforma unificada para gerenciamento financeiro, integrando dados de diferentes fontes e oferecendo uma visão consolidada.",
    results: [
      "Visão centralizada de finanças pessoais ou de pequenos negócios",
      "Visão de entradas e saidas financeiras com mais clareza",
      "Integração com sua folha de pagamento para controle de receitas",
    ],
    category: "Desenvolvimento",
    status: "Em evolução",
    stack: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "React",
      "Docker",
      "Linux",
      "Git",
    ],
    highlights: [
      "Centralização de dados financeiros",
      "Visão clara de receitas e despesas",
      "Integração com sua folha de pagamento",
    ],
    featured: true,
    isTemplate: false,
    links: [
      {
        label: "GitHub",
        href: "https://github.com/AndersonLems/gerenciarcontas",
      },
    ],
  },
  {
    slug: "E-Commerce-Backend",
    title: "Modelo inicial para backend de e-commerce",
    summary:
      "Modelo inicial para backend de e-commerce, focado em organização de rotinas operacionais e integração com sistemas de pagamento.",
    overview: "Integração com sistemas de pagamento e gestão de pedidos.",
    problem:
      "A gestão de um e-commerce envolve múltiplas rotinas e sistemas, o que pode gerar complexidade e dificultar a manutenção.",
    solution:
      "A proposta é criar uma arquitetura modular que permita a integração de diferentes sistemas e rotinas de forma coesa.",
    results: [
      "Base funcional para backend de e-commerce",
      "Estrutura modular para integração de sistemas de pagamento e gestão de pedidos",
      "Organização de rotinas operacionais para suporte a operações de e-commerce",
    ],
    category: "Desenvolvimento",
    status: "Modelo inicial",
    stack: [
      "CommonJS",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "Prisma",
      "Linux",
      "Git",
    ],
    highlights: [
      "Arquitetura modular para e-commerce",
      "Integração inicial com sistemas de pagamento",
      "Organização de rotinas operacionais para e-commerce",
    ],
    featured: false,
    isTemplate: false,
    links: [
      {
        label: "GitHub",
        href: "https://github.com/AndersonLems/commerce_store",
      },
    ],
  },
  {
    slug: "E-commerce-frontend",
    title: "Modelo inicial para frontend de e-commerce",
    summary: "Case técnico para frontend de e-commerce.",
    overview:
      "Projeto orientado à criação de uma interface de usuário para e-commerce.",
    problem:
      "A falta de uma interface de usuário coesa pode dificultar a navegação e a interação do cliente com o e-commerce.",
    solution:
      "A abordagem propõe fluxos de navegação claros e consistentes, com ênfase na experiência do usuário.",
    results: [
      "Base funcional para frontend de e-commerce",
      "Fluxos de navegação claros e consistentes",
      "Foco na experiência do usuário para e-commerce",
    ],
    category: "Desenvolvimento",
    status: "Modelo inicial",
    stack: [
      "TypeScript",
      "React",
      "Tailwind",
      "ShadcnUI",
      "Vite",
      "Git",
      "Docker",
    ],
    highlights: [
      "Interface de usuário para e-commerce",
      "Fluxos de navegação claros e consistentes",
      "Foco na experiência do usuário para e-commerce",
    ],
    featured: false,
    isTemplate: false,
    links: [
      {
        label: "Github",
        href: "https://github.com/AndersonLems/ecommerce-store-frontend",
      },
    ],
  },
] satisfies ReadonlyArray<Project>;

const repository = new ProjectRepository(
  rawProjects.map((project) => new ProjectModel(project)),
);

export function getProjectSlugs() {
  return repository.getProjectSlugs();
}

export function getProjectBySlug(slug: string) {
  return repository.getProjectBySlug(slug);
}

export function getFilteredProjects(filters: ProjectFilters) {
  return repository.getFilteredProjects(filters);
}

export function getProjectsSectionContent(
  filters: ProjectFilters,
): SectionViewModel<ProjectsSectionContent> {
  const selectedCategory = repository
    .getCategories()
    .find(
      (item) =>
        formatLabelValue(item) === formatLabelValue(filters.category ?? "all"),
    );
  const selectedStatus = repository
    .getStatuses()
    .find(
      (item) =>
        formatLabelValue(item) === formatLabelValue(filters.status ?? "all"),
    );

  const items = repository.getFilteredProjects(filters);

  return {
    id: "projects",
    title: "Projetos",
    content: {
      title: "Projetos e cases técnicos",
      intro:
        "Cases alinhados ao contexto técnico de Anderson Lemos. Quando um item ainda não representa uma entrega pública final, ele fica marcado explicitamente como modelo inicial.",
      items,
      total: items.length,
      availableCategories: repository.getCategories(),
      availableStatuses: repository.getStatuses(),
      selectedCategory: selectedCategory ?? "all",
      selectedStatus: selectedStatus ?? "all",
    },
  };
}
