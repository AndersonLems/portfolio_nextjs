export type BentoFeatureItem = {
  title: string;
  description: string;
  meta?: string;
};

export type GlassPortfolioHighlight = {
  title: string;
  description: string;
};

export type GlassPortfolioLink = {
  label: string;
  value: string;
  href?: string;
  icon: "mail" | "github" | "linkedin" | "map" | "link";
};

export type GlassPortfolioProfile = {
  name: string;
  role: string;
  summary: string;
  photoUrl?: string;
};

export type GlassPortfolioContent = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: GlassPortfolioHighlight[];
  links: GlassPortfolioLink[];
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  profile: GlassPortfolioProfile;
};

export type ProjectCarouselItem = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  status: string;
  stack: string[];
  highlights: string[];
  linkHref: string;
};
