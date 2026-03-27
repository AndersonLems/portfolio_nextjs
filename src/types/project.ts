export type ProjectCategory =
  | "Redes"
  | "Observabilidade"
  | "Infraestrutura"
  | "Desenvolvimento";

export type ProjectStatus =
  | "Case técnico"
  | "Modelo inicial"
  | "Em evolução"
  | "Operação";

export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  results: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  stack: string[];
  highlights: string[];
  featured: boolean;
  isTemplate: boolean;
  links: ProjectLink[];
};

export type ProjectCardViewModel = {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  status: ProjectStatus;
  stack: string[];
  highlights: string[];
  featured: boolean;
  isTemplate: boolean;
};

export type ProjectDetailViewModel = {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  results: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  stack: string[];
  highlights: string[];
  links: ProjectLink[];
  featured: boolean;
  isTemplate: boolean;
};

export type ProjectsSectionContent = {
  title: string;
  intro: string;
  items: ProjectCardViewModel[];
  total: number;
  availableCategories: ProjectCategory[];
  availableStatuses: ProjectStatus[];
  selectedCategory: ProjectCategory | "all";
  selectedStatus: ProjectStatus | "all";
};
