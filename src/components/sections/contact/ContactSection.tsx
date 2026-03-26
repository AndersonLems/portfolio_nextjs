"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Textarea } from "@/components/ui/Textarea";
import { validateContactInput } from "@/lib/validators/contact";
import type {
  ContactFormErrors,
  ContactFormInput,
  ContactFormResponse,
} from "@/types/contact";
import type { ContactContent, SectionViewModel } from "@/types/portfolio";

const initialState: ContactFormInput = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type ContactSectionProps = {
  section: SectionViewModel<ContactContent>;
};

export function ContactSection({ section }: ContactSectionProps) {
  const [form, setForm] = useState<ContactFormInput>(initialState);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [response, setResponse] = useState<ContactFormResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof ContactFormInput>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateContactInput(form);

    if (Object.keys(validation.errors).length > 0) {
      setErrors(validation.errors);
      setResponse({
        success: false,
        message: "Revise os campos do formulário antes de enviar.",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const payload = (await result.json()) as ContactFormResponse;

      setResponse(payload);

      if (payload.success) {
        setForm(initialState);
      } else {
        setErrors(payload.errors ?? {});
      }
    } catch {
      setResponse({
        success: false,
        message:
          "Não foi possível enviar a mensagem agora. O endpoint ainda é um modelo inicial.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-20 sm:py-24">
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <SectionTitle
            eyebrow="Contato"
            title={section.content.title}
            description={section.content.intro}
          />

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm leading-7 text-slate-400">
              {section.content.availability}
            </p>

            <ul className="mt-6 space-y-4">
              {section.content.channels.map((channel) => (
                <li key={channel.label} className="rounded-2xl bg-slate-950/70 p-4">
                  <p className="text-sm font-semibold text-slate-100">
                    {channel.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">{channel.value}</p>
                  {channel.note ? (
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                      {channel.note}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Nome"
              id="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Seu nome"
              error={errors.name}
            />
            <Input
              label="Email"
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="voce@exemplo.com"
              error={errors.email}
            />
          </div>

          <div className="mt-5">
            <Input
              label="Assunto"
              id="subject"
              value={form.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              placeholder="Como posso ajudar?"
              error={errors.subject}
            />
          </div>

          <div className="mt-5">
            <Textarea
              label="Mensagem"
              id="message"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Descreva seu contexto, objetivo ou oportunidade."
              error={errors.message}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar mensagem"}
            </Button>
            {response ? (
              <p
                className={
                  response.success ? "text-sm text-emerald-300" : "text-sm text-rose-300"
                }
              >
                {response.message}
              </p>
            ) : null}
          </div>
        </form>
      </Container>
    </section>
  );
}
