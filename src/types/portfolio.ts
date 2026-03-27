export type CTA = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type NavItem = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  name: string;
  role: string;
  location: string;
  summary: string;
  highlights: string[];
  ctas: CTA[];
};

export type AboutContent = {
  title: string;
  intro: string;
  currentRole: string;
  education: string[];
  focusAreas: string[];
  stack: string[];
  photoUrl?: string;
};

export type SkillItem = {
  name: string;
  description: string;
};

export type SkillCategory = {
  title: string;
  summary: string;
  items: SkillItem[];
};

export type ContactContent = {
  title: string;
  intro: string;
  availability: string;
  channels: {
    label: string;
    value: string;
    href?: string;
    note?: string;
  }[];
};

export type SectionViewModel<TContent> = {
  id: string;
  title: string;
  content: TContent;
};
