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
    slug: "automacao-olts-multivendor",
    title: "Automação de OLTs multivendor",
    summary:
      "Case técnico para padronizar rotinas operacionais em OLTs ZTE, VSOL e Huawei.",
    overview:
      "Este case técnico apresenta uma base para automação de tarefas repetitivas de operação em ambientes multivendor, reduzindo esforço manual e acelerando atendimentos técnicos.",
    problem:
      "Operações recorrentes em OLTs de fabricantes distintos tendem a gerar variação de procedimento, tempo de resposta maior e dependência de conhecimento tácito.",
    solution:
      "A proposta é consolidar comandos, fluxos e validações em uma camada de automação com foco em repetibilidade, clareza operacional e expansão futura.",
    results: [
      "Padronização de rotinas críticas",
      "Redução de atividades manuais em cenários repetitivos",
      "Base pronta para evoluir para integração real com inventário e auditoria",
    ],
    category: "Automação",
    status: "Case técnico",
    stack: ["TypeScript", "Node.js", "Python", "Huawei", "ZTE", "VSOL"],
    highlights: [
      "Padronização operacional",
      "Escalabilidade para ambiente multivendor",
      "Organização do conhecimento técnico em fluxos reproduzíveis",
    ],
    featured: true,
    isTemplate: false,
    links: [],
  },
  {
    slug: "painel-diagnostico-ppp-bng",
    title: "Painel de diagnóstico PPP/BNG",
    summary:
      "Case técnico para análise rápida de autenticação, sessões PPP e incidentes de borda.",
    overview:
      "Pensado como interface operacional para consolidar sinais de diagnóstico em um único painel, reduzindo o tempo para triagem técnica.",
    problem:
      "Quando o diagnóstico depende de múltiplas fontes, o troubleshooting perde velocidade e o contexto do incidente fica fragmentado.",
    solution:
      "A solução organiza indicadores essenciais de autenticação, estado de sessão e contexto operacional em uma visualização clara para suporte N2.",
    results: [
      "Visão centralizada para troubleshooting",
      "Menor dispersão entre ferramentas e consultas",
      "Base viável para evoluir para observabilidade contínua",
    ],
    category: "Redes",
    status: "Em evolução",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "Nginx"],
    highlights: [
      "Leitura operacional orientada a resposta rápida",
      "Estrutura escalável para novas métricas",
      "Aproximação entre dado técnico e tomada de decisão",
    ],
    featured: true,
    isTemplate: false,
    links: [],
  },
  {
    slug: "observabilidade-aaa-radius",
    title: "Observabilidade de AAA/Radius",
    summary:
      "Case técnico para monitoramento de autenticação, análise de falhas e rastreabilidade de eventos Radius.",
    overview:
      "Projeto focado em dar mais visibilidade a eventos de autenticação, comportamento de serviço e pontos recorrentes de falha em fluxos AAA.",
    problem:
      "Sem rastreabilidade organizada, correlações entre falhas de autenticação e eventos operacionais ficam lentas e sujeitas a perda de contexto.",
    solution:
      "A modelagem prioriza coleta estruturada, organização de eventos e apoio à leitura técnica para suporte e operação.",
    results: [
      "Maior clareza sobre eventos de autenticação",
      "Base para alertas e métricas operacionais",
      "Suporte à investigação técnica com histórico consolidado",
    ],
    category: "Observabilidade",
    status: "Case técnico",
    stack: ["Python", "PostgreSQL", "Debian", "Docker", "Radius"],
    highlights: [
      "Rastreabilidade de eventos",
      "Foco em saúde de serviço",
      "Preparação para alertas e painéis analíticos",
    ],
    featured: false,
    isTemplate: false,
    links: [],
  },
  {
    slug: "portal-operacional-sgp",
    title: "Portal operacional para rotinas SGP",
    summary:
      "Modelo inicial para centralizar consultas, atalhos técnicos e fluxos operacionais do dia a dia.",
    overview:
      "Este item está marcado como modelo inicial e funciona como direção de produto para uma futura interface de apoio operacional.",
    problem:
      "Rotinas recorrentes acabam distribuídas entre documentação, comandos manuais e conhecimento individual, o que reduz previsibilidade.",
    solution:
      "A proposta é organizar essas rotinas em módulos claros, com entradas e saídas previsíveis, preservando escalabilidade e manutenção simples.",
    results: [
      "Modelo inicial para consolidação de fluxos",
      "Estrutura concebida para crescer em módulos",
      "Redução futura de dependência de conhecimento tácito",
    ],
    category: "Desenvolvimento",
    status: "Modelo inicial",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    highlights: [
      "Centralização operacional",
      "Base para crescimento modular",
      "Integração natural entre operação e desenvolvimento",
    ],
    featured: false,
    isTemplate: true,
    links: [],
  },
  {
    slug: "automacao-backup-e-recuperacao",
    title: "Automação de backup e recuperação",
    summary:
      "Case técnico voltado à organização de rotinas de backup, conferência e recuperação com apoio operacional.",
    overview:
      "Projeto orientado à confiabilidade operacional, usando práticas de automação e verificação para dar mais previsibilidade a processos de backup.",
    problem:
      "Processos de backup e recuperação podem falhar silenciosamente quando não há uma camada consistente de conferência e acompanhamento.",
    solution:
      "A abordagem propõe fluxos simples de checagem, visibilidade de status e preparação para integração com ferramentas existentes.",
    results: [
      "Mais previsibilidade em rotinas críticas",
      "Base para auditoria de execução",
      "Suporte à continuidade operacional",
    ],
    category: "Infraestrutura",
    status: "Case técnico",
    stack: ["Python", "Docker", "Debian", "Acronis"],
    highlights: [
      "Rotinas críticas com mais controle",
      "Visibilidade de execução",
      "Aderência a práticas de continuidade",
    ],
    featured: false,
    isTemplate: false,
    links: [],
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
    .find((item) => formatLabelValue(item) === formatLabelValue(filters.category ?? "all"));
  const selectedStatus = repository
    .getStatuses()
    .find((item) => formatLabelValue(item) === formatLabelValue(filters.status ?? "all"));

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
