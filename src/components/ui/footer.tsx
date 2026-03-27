import Link from "next/link";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  GlobeIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import type { ElementType } from "react";
import { Container } from "@/components/layout/Container";
import type { NavItem } from "@/types/portfolio";

type FooterLink = {
  label: string;
  value: string;
  href?: string;
};

type FooterProps = {
  author: string;
  description: string;
  navigation: NavItem[];
  contactLinks: FooterLink[];
};

type FooterIcon = ElementType;

function resolveHref(link: FooterLink) {
  if (link.href) {
    return link.href;
  }

  if (link.label.toLowerCase().includes("email")) {
    return `mailto:${link.value}`;
  }

  if (link.label.toLowerCase().includes("linkedin")) {
    return link.value.startsWith("http") ? link.value : `https://${link.value}`;
  }

  return undefined;
}

function getIcon(label: string): FooterIcon {
  const normalized = label.toLowerCase();

  if (normalized.includes("email")) {
    return EnvelopeClosedIcon;
  }

  if (normalized.includes("linkedin")) {
    return LinkedInLogoIcon;
  }

  if (normalized.includes("github")) {
    return GitHubLogoIcon;
  }

  return GlobeIcon;
}

export function Footer({
  author,
  description,
  navigation,
  contactLinks,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-background/94 py-12 md:py-16">
      <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-5">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.34em] text-primary">
              {author}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-border/70 bg-card px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground transition hover:border-primary/28 hover:bg-background hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {contactLinks.map((link) => {
            const href = resolveHref(link);
            const Icon = getIcon(link.label);

            if (!href) {
              return (
                <div
                  key={`${link.label}-${link.value}`}
                  className="flex items-center gap-3 rounded-[1.25rem] border border-border/70 bg-card px-4 py-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-muted/72 text-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{link.label}</p>
                    <p className="text-xs text-muted-foreground">{link.value}</p>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={`${link.label}-${link.value}`}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="flex items-center gap-3 rounded-[1.25rem] border border-border/70 bg-card px-4 py-3 transition hover:border-primary/28 hover:bg-background"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-muted/72 text-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{link.label}</p>
                  <p className="text-xs text-muted-foreground">{link.value}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>

      <Container className="mt-8 border-t border-border/60 pt-6 text-sm text-muted-foreground">
        <p>© {currentYear} {author}. Todos os direitos reservados.</p>
      </Container>
    </footer>
  );
}
