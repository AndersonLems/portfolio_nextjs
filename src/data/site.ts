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
  siteName: "Anderson Lemos | Portfólio",
  description:
    "Portfólio técnico de Anderson Lemos com foco em redes, infraestrutura, automação e desenvolvimento.",
  baseUrl: "https://portfolio-modelo-inicial.local",
  locale: "pt_BR",
};

const heroSection = new HeroSectionModel({
  eyebrow: "Analista de Suporte Técnico N2 • SGP",
  name: "Anderson Lemos",
  role:
    "Infraestrutura, redes, automação e desenvolvimento com foco em eficiência operacional.",
  location: "Natal/RN • Brasil",
  summary:
    "Atuação orientada a troubleshooting avançado, operação crítica e construção de soluções que aproximam suporte, infraestrutura e desenvolvimento.",
  highlights: [
    "Cisco, Nokia, Huawei e Mikrotik",
    "PPP, BGP e AAA/Radius",
    "Linux Debian, Nginx e SSL/TLS",
    "Docker, Node.js, TypeScript e Python",
    "PostgreSQL e automação de rede",
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
    "Anderson Lemos é natural de Natal/RN, acadêmico em Ciências e Tecnologia pela UFRN e Técnico em Mecatrônica pelo IFRN – Campus Parnamirim. Sua trajetória conecta suporte técnico, redes, infraestrutura, automação e desenvolvimento com foco em eficiência operacional.",
  currentRole:
    "Atua como Analista de Suporte Técnico N2 com foco no SGP (Sistema de Gestão de Provedores), lidando com troubleshooting avançado em cenários multivendor e apoio a ambientes críticos de operação.",
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
    "Docker",
    "Docker Compose",
    "Debian",
    "Nginx",
    "Mikrotik",
    "Acronis",
  ],
});

const skillsSection = new SkillsSectionModel([
  {
    title: "Redes e operação",
    summary:
      "Atuação em ambientes de produção com foco em estabilidade, diagnóstico e resposta rápida.",
    items: [
      {
        name: "Troubleshooting PPP/BNG",
        description:
          "Análise de sessões, autenticação e comportamento de borda em ambientes de operação.",
      },
      {
        name: "AAA/Radius",
        description:
          "Investigação de falhas, rastreabilidade de eventos e apoio a fluxos de autenticação.",
      },
      {
        name: "Ambientes multivendor",
        description:
          "Experiência prática com Cisco, Nokia, Huawei e Mikrotik em cenários heterogêneos.",
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
    title: "Automação e desenvolvimento",
    summary:
      "Construção de ferramentas que reduzem esforço manual e melhoram a eficiência operacional.",
    items: [
      {
        name: "TypeScript e Node.js",
        description:
          "Automação, interfaces internas e camadas de integração orientadas a produtividade.",
      },
      {
        name: "Python",
        description:
          "Scripts e fluxos técnicos para apoio a operação, integração e tratamento de dados.",
      },
      {
        name: "PostgreSQL",
        description:
          "Persistência e organização de dados técnicos para relatórios, painéis e suporte analítico.",
      },
    ],
  },
]);

const contactSection = new ContactSectionModel({
  title: "Vamos conversar sobre operação, automação e evolução técnica",
  intro:
    "Este portfólio já está pronto para apresentar atuação técnica, cases e uma base inicial de contato. Dados públicos finais podem ser ajustados quando o conteúdo real estiver fechado.",
  availability:
    "Disponibilidade de contato: modelo inicial, a preencher com canais definitivos antes do deploy público.",
  channels: [
    {
      label: "Email",
      value: "a preencher",
      note: "modelo inicial",
    },
    {
      label: "LinkedIn",
      value: "a preencher",
      note: "modelo inicial",
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
