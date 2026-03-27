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
import type { ElementType } from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import type { GlassPortfolioContent, GlassPortfolioLink } from "@/types/home";

type SocialLink = Omit<GlassPortfolioLink, "icon"> & {
  icon: ElementType;
};

type GlassmorphismPortfolioBlockProps = {
  content: GlassPortfolioContent;
};

const iconMap: Record<
  GlassPortfolioLink["icon"],
  ElementType
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
    <section id="sobre" className="py-14 sm:py-20 lg:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card p-5 shadow-none sm:p-8 sm:shadow-[0_28px_70px_-56px_rgba(0,0,0,0.82)] md:p-12"
        >
          <div className="pointer-events-none absolute inset-0 opacity-40 sm:opacity-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_24%),radial-gradient(circle_at_top_left,rgba(207,142,165,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(106,143,130,0.05),transparent_42%)]" />

          <div className="relative grid gap-7 sm:gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-6 sm:space-y-8">
              <Badge variant="accent" className="px-3 py-1.5 sm:px-4">
                {content.eyebrow}
              </Badge>

              <div className="space-y-4">
                <h2 className="text-[1.65rem] font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl wrap-anywhere">
                  {content.title}
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground line-clamp-5 sm:line-clamp-none sm:text-base sm:leading-8">
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
                    className={cn(
                      "rounded-[1.5rem] border border-border/70 bg-muted/72 p-4 sm:p-5",
                      index > 1 && "hidden sm:block",
                    )}
                  >
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground/85 sm:leading-7">
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
                  <Button
                    href={content.secondaryCta.href}
                    size="lg"
                    variant="secondary"
                  >
                    {content.secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            </div>

            <Card className="rounded-[28px] border-border/70 bg-muted/76">
              <CardContent className="flex h-full flex-col gap-7 p-5 sm:gap-8 sm:p-8">
                <div className="flex flex-col items-center text-center">
                  {content.profile.photoUrl ? (
                    <div className="relative">
                      <div className="absolute inset-x-4 -bottom-4 h-10 rounded-full bg-primary/18 blur-2xl sm:blur-2xl" />
                      <div className="relative rounded-[2.2rem] border border-primary/24 bg-card/95 p-2 shadow-none sm:shadow-[0_34px_80px_-42px_rgba(0,0,0,0.92)]">
                        <div className="relative h-44 w-32 overflow-hidden rounded-[1.6rem] border border-border/70 bg-card sm:h-64 sm:w-48">
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
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border/70 bg-card text-3xl font-semibold text-foreground sm:h-32 sm:w-32 sm:text-4xl">
                      {content.profile.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                  )}

                  <div className="mt-6 space-y-2 min-w-0">
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                      {content.profile.name}
                    </h3>
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground break-words">
                      {content.profile.role}
                    </p>
                  </div>

                  <div className="mt-4 w-full max-w-md rounded-[1.5rem] border border-border/70 bg-card/72 p-4 text-left sm:mt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:text-[11px]">
                      Tópicos
                    </p>
                    <ul className="mt-3 space-y-2.5 text-sm leading-7 text-foreground/78">
                      {profileTopics.map((topic, index) => (
                        <li
                          key={topic}
                          className={cn("flex gap-2", index > 2 && "hidden sm:flex")}
                        >
                          <span className="mt-[0.72rem] h-1.5 w-1.5 rounded-full bg-primary/80" />
                          <span className="min-w-0 break-words">{topic}</span>
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
                        className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-border/70 bg-card px-4 py-3 text-center transition hover:border-primary/28 hover:bg-card/96 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:text-left sm:hover:-translate-y-0.5"
                      >
                        <div className="flex min-w-0 flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground/80 sm:hidden">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <div className="hidden sm:block">
                              <p className="text-sm font-semibold text-foreground">
                                {social.label}
                              </p>
                              <p className="text-xs text-muted-foreground break-words">
                                {social.value}
                              </p>
                            </div>
                            <p className="text-xs font-semibold text-muted-foreground sm:hidden">
                              {social.label}
                            </p>
                          </div>
                        </div>
                        {social.href ? (
                          <ArrowTopRightIcon className="hidden h-4 w-4 text-muted-foreground transition group-hover:text-foreground sm:block" />
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
