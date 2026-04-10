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
    {
    slug: "stream-app",
    title: "Aplicativo de streaming e IPTV",
    summary: "Modelo inicial de app para leitura de playlists M3U e reprodução de canais.",
    overview:
      "Projeto orientado ao desenvolvimento de uma interface para streaming e IPTV, com foco em organização de playlists, navegação entre categorias e experiência de reprodução.",
    problem:
      "Muitos aplicativos de IPTV apresentam navegação confusa, baixa padronização visual e dificuldade para localizar canais e conteúdos com rapidez.",
    solution:
      "A proposta organiza o fluxo de uso em etapas simples (lista, seleção e reprodução), com interface consistente e componentes reutilizáveis para melhorar a experiência do usuário.",
    results: [
      "Base funcional para frontend de streaming e IPTV",
      "Leitura e organização inicial de playlists M3U",
      "Fluxos de navegação mais claros para seleção e reprodução de conteúdo",
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
      "Java Spring Boot",
    ],
    highlights: [
      "Interface de usuário voltada para streaming e IPTV",
      "Estrutura inicial para leitura de playlists M3U",
      "Navegação simplificada para descoberta de canais e conteúdos",
    ],
    featured: false,
    isTemplate: false,
    links: [
      {
        label: "Github",
        href: "https://github.com/AndersonLems/springboot_iptv",
      },
    ],
  },
  {
    slug: "analise-leishmaniose-pysus",
    title: "Análise de leishmaniose visceral com PySUS",
    summary:
      "Case técnico de análise exploratória com dados públicos do SINAN usando Python e notebook.",
    overview:
      "Projeto de análise de dados focado em notificações de leishmaniose visceral no Brasil, com enriquecimento geográfico, tratamento de datas e geração de visualizações comparativas.",
    problem:
      "Dados epidemiológicos públicos costumam vir em formato bruto, com códigos e estrutura que dificultam leitura rápida para análise inicial.",
    solution:
      "A abordagem consolida coleta via PySUS, normalização de campos e recortes analíticos em notebook para transformar dados técnicos em insights mais legíveis.",
    results: [
      "Coleta de registros e metadados do agravo LEIV via PySUS",
      "Recortes analíticos para casos confirmados, óbitos e registros inconclusivos",
      "Geração de gráficos e painéis em PNG para apoio à leitura epidemiológica",
    ],
    category: "Desenvolvimento",
    status: "Case técnico",
    stack: [
      "Python",
      "Jupyter Notebook",
      "PySUS",
      "Pandas",
      "NumPy",
      "Seaborn",
      "Matplotlib",
      "Requests",
      "Git",
    ],
    highlights: [
      "Integração com dados públicos de saúde via PySUS",
      "Tratamento de dados para análise exploratória em notebook",
      "Visualizações para comparação temporal e geográfica de notificações",
    ],
    featured: false,
    isTemplate: false,
    links: [
      {
        label: "Github",
        href: "https://github.com/AndersonLems/data_pysus_python",
      },
    ],
  },
  {
    slug: "analise-preco-combustivel-global",
    title: "Análise global de preços de combustíveis",
    summary:
      "Modelo inicial de análise de dados para evolução do preço da gasolina com exploração estatística e ML.",
    overview:
      "Projeto de análise de dados com séries históricas globais de combustíveis, incluindo comparação entre países, leitura do cenário brasileiro e aplicação de modelos para tendência de preços.",
    problem:
      "Sem uma análise estruturada, fica difícil comparar países, entender volatilidade e identificar tendências do preço da gasolina no Brasil ao longo do tempo.",
    solution:
      "A solução organiza o fluxo em limpeza e transformação da base, análise exploratória, conversão para moeda local, regressão para tendência e clusterização de países por comportamento de preços.",
    results: [
      "Ranking e comparação histórica de preços de gasolina entre países",
      "Estimativa de tendência de preço da gasolina no Brasil com regressão",
      "Agrupamento de países por perfil de preço e volatilidade com KMeans",
    ],
    category: "Desenvolvimento",
    status: "Modelo inicial",
    stack: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Scikit-learn",
      "Google Colab",
      "Git",
    ],
    highlights: [
      "Análise global com foco comparativo entre países",
      "Série histórica do Brasil convertida para Real (R$)",
      "Pipeline com EDA, previsão e clusterização em um único estudo",
    ],
    featured: false,
    isTemplate: true,
    links: [
      {
        label: "Github",
        href: "https://github.com/AndersonLems/data_fuel_python",
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
