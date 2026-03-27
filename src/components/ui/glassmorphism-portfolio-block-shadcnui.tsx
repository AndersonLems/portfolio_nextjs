"use client";

import {
  ArrowTopRightIcon,
  EnvelopeClosedIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
  GlobeIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { GlassPortfolioContent, GlassPortfolioLink } from "@/types/home";

type SocialLink = Omit<GlassPortfolioLink, "icon"> & {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type GlassmorphismPortfolioBlockProps = {
  content: GlassPortfolioContent;
};

const iconMap: Record<
  GlassPortfolioLink["icon"],
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  mail: EnvelopeClosedIcon,
  github: GitHubLogoIcon,
  linkedin: LinkedInLogoIcon,
  map: GlobeIcon,
  link: ExternalLinkIcon,
};

export function GlassmorphismPortfolioBlock({
  content,
}: GlassmorphismPortfolioBlockProps) {
  const socialLinks: SocialLink[] = content.links.map((link) => ({
    ...link,
    icon: iconMap[link.icon],
  }));
  const profileTopics = content.profile.summary
    .split(" • ")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <section id="sobre" className="py-20 lg:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card p-8 shadow-[0_28px_70px_-56px_rgba(0,0,0,0.82)] md:p-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_24%),radial-gradient(circle_at_top_left,rgba(207,142,165,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(106,143,130,0.05),transparent_42%)]" />

          <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-8">
              <Badge variant="accent" className="px-4 py-1.5">
                {content.eyebrow}
              </Badge>

              <div className="space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {content.title}
                </h2>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                  {content.description}
                </p>
              </div>

              <div className="grid gap-4">
                {content.highlights.map((item, index) => (
                  <motion.div
                    key={`${item.title}-${index}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.28, delay: 0.06 * index }}
                    className="rounded-[1.5rem] border border-border/70 bg-muted/72 p-5"
                  >
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-foreground/85">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button href={content.primaryCta.href} size="lg">
                  {content.primaryCta.label}
                  <ArrowTopRightIcon className="h-4 w-4" />
                </Button>
                {content.secondaryCta ? (
                  <Button href={content.secondaryCta.href} size="lg" variant="secondary">
                    {content.secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            </div>

            <Card className="rounded-[28px] border-border/70 bg-muted/76">
              <CardContent className="flex h-full flex-col gap-8 p-8">
                <div className="flex flex-col items-center text-center">
                  {content.profile.photoUrl ? (
                    <div className="relative">
                      <div className="absolute inset-x-4 -bottom-4 h-10 rounded-full bg-primary/18 blur-2xl" />
                      <div className="relative rounded-[2.4rem] border border-primary/24 bg-card/95 p-2 shadow-[0_34px_80px_-42px_rgba(0,0,0,0.92)]">
                        <div className="relative h-64 w-48 overflow-hidden rounded-[1.9rem] border border-border/70 bg-card">
                          <Image
                            src={content.profile.photoUrl}
                            alt={`Foto de ${content.profile.name}`}
                            fill
                            sizes="192px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border border-border/70 bg-card text-4xl font-semibold text-foreground">
                      {content.profile.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                  )}

                  <div className="mt-6 space-y-2">
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                      {content.profile.name}
                    </h3>
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground">
                      {content.profile.role}
                    </p>
                  </div>

                  <div className="mt-5 w-full max-w-md rounded-[1.5rem] border border-border/70 bg-card/72 p-4 text-left">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                      Tópicos
                    </p>
                    <ul className="mt-3 space-y-2.5 text-sm leading-7 text-foreground/78">
                      {profileTopics.map((topic) => (
                        <li key={topic} className="flex gap-2">
                          <span className="mt-[0.72rem] h-1.5 w-1.5 rounded-full bg-primary/80" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    const Wrapper = social.href ? "a" : "div";

                    return (
                      <Wrapper
                        key={social.label}
                        {...(social.href
                          ? {
                              href: social.href,
                              target: social.href.startsWith("mailto:")
                                ? undefined
                                : "_blank",
                              rel: social.href.startsWith("mailto:")
                                ? undefined
                                : "noopener noreferrer",
                            }
                          : {})}
                        className="group flex items-center justify-between rounded-2xl border border-border/70 bg-card px-4 py-3 transition hover:-translate-y-0.5 hover:border-primary/28 hover:bg-card/96"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground/80">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {social.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {social.value}
                            </p>
                          </div>
                        </div>
                        {social.href ? (
                          <ArrowTopRightIcon className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
                        ) : null}
                      </Wrapper>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
