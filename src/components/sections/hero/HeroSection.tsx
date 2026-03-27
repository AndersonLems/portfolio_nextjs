import { ModernAnimatedHeroSection } from "@/components/ui/modern-animated-hero-section";
import type { HeroContent, SectionViewModel } from "@/types/portfolio";

type HeroSectionProps = {
  section: SectionViewModel<HeroContent>;
};

export function HeroSection({ section }: HeroSectionProps) {
  return <ModernAnimatedHeroSection content={section.content} />;
}
