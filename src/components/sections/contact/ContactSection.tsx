"use client";

import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getContactChannelHref, getContactChannelIcon } from "@/lib/contact";
import type { ContactContent, SectionViewModel } from "@/types/portfolio";

type ContactSectionProps = {
  section: SectionViewModel<ContactContent>;
  variant?: "home" | "page";
};

export function ContactSection({
  section,
  variant = "page",
}: ContactSectionProps) {
  return (
    <section id="contato" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <Container className="space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <SectionTitle
            eyebrow="Contato"
            title={section.content.title}
            description={section.content.intro}
          />
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-none sm:p-8 sm:shadow-[0_24px_60px_-48px_rgba(0,0,0,0.82)]"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
              Disponibilidade
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              {section.content.availability}
            </p>

            {variant === "home" ? (
              <div className="mt-8 rounded-[1.5rem] border border-border/70 bg-muted/74 p-4 sm:p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  CTA final
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Em vez de formulário, o fechamento da Home aponta diretamente para os
                  canais reais de contato.
                </p>
              </div>
            ) : null}
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {section.content.channels.map((channel) => {
              const href = getContactChannelHref(channel);
              const Icon = getContactChannelIcon(channel.label);
              const cardProps = href
                ? {
                    href,
                    target: href.startsWith("mailto:") ? undefined : "_blank",
                    rel: href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer",
                  }
                : {};

              return (
                <motion.div
                  key={`${channel.label}-${channel.value}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {href ? (
                    <a
                      {...cardProps}
                      className="group block min-h-[10.5rem] rounded-[1.75rem] border border-border/70 bg-card p-5 transition sm:hover:-translate-y-0.5 hover:border-primary/28 hover:bg-card/96"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-muted/74 text-foreground">
                          <Icon className="h-5 w-5" />
                        </span>
                        <ArrowTopRightIcon className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
                      </div>

                      <div className="mt-6">
                        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                          {channel.label}
                        </p>
                        <p className="mt-3 break-words text-sm font-semibold text-foreground">
                          {channel.value}
                        </p>
                        {channel.note ? (
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            {channel.note}
                          </p>
                        ) : null}
                      </div>
                    </a>
                  ) : (
                    <div className="min-h-[10.5rem] rounded-[1.75rem] border border-border/70 bg-card p-5">
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-muted/74 text-foreground">
                          <Icon className="h-5 w-5" />
                        </span>
                      </div>

                      <div className="mt-6">
                        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                          {channel.label}
                        </p>
                        <p className="mt-3 break-words text-sm font-semibold text-foreground">
                          {channel.value}
                        </p>
                        {channel.note ? (
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            {channel.note}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
