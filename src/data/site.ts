import { Measure } from "@/lib/decorators/measure";
import { Sealed } from "@/lib/decorators/sealed";
import type {
  AboutContent,
  ContactContent,
  HeroContent,
  NavItem,
  SectionViewModel,
  SkillCategory,
} from "@/types/portfolio";

abstract class BaseSection<TContent> {
  constructor(
    protected readonly id: string,
    protected readonly title: string,
  ) {}

  abstract toViewModel(): SectionViewModel<TContent>;
}

@Sealed()
class HeroSectionModel extends BaseSection<HeroContent> {
  constructor(private readonly content: HeroContent) {
    super("hero", "Início");
  }

  @Measure("hero:view-model")
  toViewModel(): SectionViewModel<HeroContent> {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
    };
  }
}

@Sealed()
class AboutSectionModel extends BaseSection<AboutContent> {
  constructor(private readonly content: AboutContent) {
    super("about", "Sobre");
  }

  @Measure("about:view-model")
  toViewModel(): SectionViewModel<AboutContent> {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
    };
  }
}

@Sealed()
class SkillsSectionModel extends BaseSection<SkillCategory[]> {
  constructor(private readonly content: SkillCategory[]) {
    super("skills", "Competências");
  }

  @Measure("skills:view-model")
  toViewModel(): SectionViewModel<SkillCategory[]> {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
    };
  }
}

@Sealed()
class ContactSectionModel extends BaseSection<ContactContent> {
  constructor(private readonly content: ContactContent) {
    super("contact", "Contato");
  }

  @Measure("contact:view-model")
  toViewModel(): SectionViewModel<ContactContent> {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
    };
  }
}

export const siteConfig = {
  author: "Anderson Lemos",
  siteName:
    "Anderson Lemos | Desenvolvedor Full-Stack e Analista de Suporte Técnico N2",
  description:
    "Portfólio técnico de Anderson Lemos com foco em redes, infraestrutura e desenvolvimento.",
  baseUrl: "https://portfolio-modelo-inicial.local",
  locale: "pt_BR",
};

const heroSection = new HeroSectionModel({
  eyebrow: "Desenvolvedor Full-Stack e Análista de Dados",
  name: "Anderson Lemos",
  role: "Infraestrutura, Redes, Análise de dados e Desenvolvimento.",
  location: "Natal/RN • Brasil",
  summary:
    "Atuação orientada a troubleshooting avançado, operação crítica e construção de soluções que aproximam suporte, infraestrutura e desenvolvimento.",
  highlights: [
    "Desenvolvimento full-stack",
    "Linux Debian, Nginx e SSL/TLS",
    "Docker, Node.js, TypeScript e Python",
    "PostgreSQL",
    "Cisco, Nokia, Huawei e Mikrotik",
    "Sólida experiência em redes e operação de provedores de internet",
    "PPP, BGP e AAA/Radius",
  ],
  ctas: [
    { label: "Ver projetos", href: "/portfolio/projetos", variant: "primary" },
    { label: "Sobre mim", href: "/portfolio/sobre", variant: "secondary" },
    { label: "Contato", href: "/portfolio/contato", variant: "secondary" },
  ],
});

const aboutSection = new AboutSectionModel({
  title: "Trajetória técnica orientada à operação e evolução contínua",
  intro:
    "Sou Anderson Lemos, um profissional de tecnologia com uma trajetória focada em redes, infraestrutura e desenvolvimento, sempre orientado a resolver problemas complexos e construir soluções que aproximem suporte, operação e desenvolvimento.",
  currentRole:
    "Atuo como Analista de Suporte Técnico N2 com foco em redes de provedores de internet e sistema de autenticação AAA, lidando com troubleshooting avançado em cenários multivendor e apoio a ambientes críticos de operação.",
  education: [
    "Ciências e Tecnologia — UFRN",
    "Técnico em Mecatrônica — IFRN Campus Parnamirim",
  ],
  focusAreas: [
    "Ambientes multivendor: Cisco, Nokia, Huawei e Mikrotik",
    "Troubleshooting avançado de PPP/BNG e AAA/Radius",
    "Linux Debian, Nginx, SSL/TLS e análise de logs",
    "Automação e integração de OLTs (ZTE, VSOL, Huawei)",
  ],
  stack: [
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Docker e Docker Compose",
    "Git e GitHub",
    "Linux",
    "Nginx",
    "Mikrotik",
  ],
});

const skillsSection = new SkillsSectionModel([
  {
    title: "Redes de computadores",
    summary:
      "Suporte Técnico N2/N3 com foco em troubleshooting avançado de protocolos de redes e operação de provedores de internet.",
    items: [
      {
        name: "Troubleshooting PPP/BNG",
        description:
          "Análise de sessões, autenticação e rastreabilidade de eventos para resolução de falhas e suporte a operação.",
      },
      {
        name: "AAA/Radius",
        description:
          "Investigação de logs, configuração e suporte ao protocolo RADIUS para autenticação, autorização e contabilização em ambientes de provedores.",
      },
      {
        name: "Ambientes multivendor",
        description:
          "Experiência prática com Cisco, Nokia, Huawei, Accel, Mikrotik e Juniper, lidando com particularidades e desafios de cada equipamento.",
      },
    ],
  },
  {
    title: "Infraestrutura e serviços",
    summary:
      "Base sólida em sistemas Linux e serviços críticos que sustentam a operação.",
    items: [
      {
        name: "Linux Debian",
        description:
          "Uso diário de top, tail, journalctl, iftop e leitura de logs para suporte e observabilidade.",
      },
      {
        name: "Nginx e SSL/TLS",
        description:
          "Configuração e manutenção de serviços web com atenção a segurança e disponibilidade.",
      },
      {
        name: "Docker e Compose",
        description:
          "Empacotamento de serviços e ambientes técnicos com foco em repetibilidade.",
      },
    ],
  },
  {
    title: "Desenvolvimento e análise de dados",
    summary:
      "Uso de linguagens de programação para automação, integração e suporte analítico, com foco em eficiência operacional.",
    items: [
      {
        name: "TypeScript e Node.js",
        description: "Desenvolvimento full-stack para SaaS",
      },
      {
        name: "Python",
        description:
          "Scripts e automação de tarefas técnicas, integração de APIs e suporte a análise de dados operacionais.",
      },
      {
        name: "PostgreSQL",
        description:
          "Modelagem, consultas e manutenção de bancos de dados para suporte a operações e análise de dados técnicos.",
      },
      {
        name: "Git e GitHub",
        description:
          "Controle de versão e colaboração em projetos de desenvolvimento e automação.",
      },
    ],
  },
]);

const contactSection = new ContactSectionModel({
  title: "Vamos conversar sobre tecnologia, projetos e oportunidades",
  intro: "Estou sempre aberto a discutir novas ideias e colaborações.",
  availability:
    "Atualmente aberto a oportunidades, projetos e empregos que valorizem a experiência técnica, a evolução contínua e a construção de soluções que aproximem suporte, infraestrutura e desenvolvimento.",
  channels: [
    {
      label: "Email",
      value: "andersoncontadev@gmail.com",
      note: "Meu email profissional para contato sobre oportunidades, projetos e parcerias técnicas.",
    },
    {
      label: "LinkedIn",
      value: "www.linkedin.com/in/anderson-lemos-013076264",
      note: "Meu perfil profissional no LinkedIn.",
    },
    {
      label: "Localização",
      value: "Natal/RN • Brasil",
    },
  ],
});

export const siteNavigation: NavItem[] = [
  { label: "Início", href: "/portfolio" },
  { label: "Sobre", href: "/portfolio/sobre" },
  { label: "Projetos", href: "/portfolio/projetos" },
  { label: "Contato", href: "/portfolio/contato" },
];

export const siteContent = {
  hero: heroSection.toViewModel(),
  about: aboutSection.toViewModel(),
  skills: skillsSection.toViewModel(),
  contact: contactSection.toViewModel(),
};

export const siteMetadata = {
  title: siteConfig.siteName,
  description: siteConfig.description,
};
