import { GlassmorphismPortfolioBlock } from "@/components/ui/glassmorphism-portfolio-block-shadcnui";
import { siteContent, siteConfig } from "@/data/site";
import { getContactChannelHref } from "@/lib/contact";
import type { AboutContent, SectionViewModel } from "@/types/portfolio";

type AboutSectionProps = {
  section: SectionViewModel<AboutContent>;
};

function getLinkIcon(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("email")) {
    return "mail" as const;
  }

  if (normalized.includes("github")) {
    return "github" as const;
  }

  if (normalized.includes("linkedin")) {
    return "linkedin" as const;
  }

  return "map" as const;
}

export function AboutSection({ section }: AboutSectionProps) {
  const [primaryCta, secondaryCta] = siteContent.hero.content.ctas;
  const links = siteContent.contact.content.channels.map((channel) => ({
    ...channel,
    href: getContactChannelHref(channel),
    icon: getLinkIcon(channel.label),
  }));

  const previewHighlights = [
    {
      title: "Atuação atual",
      description: section.content.currentRole,
    },
    {
      title: "Formação",
      description: section.content.education.join(" • "),
    },
    {
      title: "Stack base",
      description: section.content.stack.slice(0, 6).join(" • "),
    },
    {
      title: "Tópicos-chave",
      description: section.content.focusAreas.join(" • "),
    },
  ];

  return (
    <GlassmorphismPortfolioBlock
      content={{
        eyebrow: "Sobre",
        title: section.content.title,
        description: `${section.content.intro} ${section.content.currentRole}`,
        highlights: previewHighlights,
        links,
        primaryCta: primaryCta
          ? { label: primaryCta.label, href: primaryCta.href }
          : { label: "Ver projetos", href: "/portfolio/projetos" },
        secondaryCta: secondaryCta
          ? { label: secondaryCta.label, href: secondaryCta.href }
          : undefined,
        profile: {
          name: siteConfig.author,
          role: siteContent.hero.content.role,
          summary: section.content.focusAreas.join(" • "),
          photoUrl: section.content.photoUrl,
        },
      }}
    />
  );
}
