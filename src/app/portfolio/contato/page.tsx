import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { siteContent } from "@/data/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Formulário de contato com validação client e server para o portfólio de Anderson Lemos.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection section={siteContent.contact} />
    </main>
  );
}
