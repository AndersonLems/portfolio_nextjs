import {
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  GlobeIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import type { ComponentType, SVGProps } from "react";
import type { ContactContent } from "@/types/portfolio";

type ContactChannel = ContactContent["channels"][number];
type ContactIcon = ComponentType<SVGProps<SVGSVGElement>>;

export function getContactChannelHref(channel: ContactChannel) {
  if (channel.href) {
    return channel.href;
  }

  const normalized = channel.label.toLowerCase();

  if (normalized.includes("email")) {
    return `mailto:${channel.value}`;
  }

  if (
    normalized.includes("linkedin") ||
    normalized.includes("github") ||
    normalized.includes("whatsapp")
  ) {
    return channel.value.startsWith("http") ? channel.value : `https://${channel.value}`;
  }

  return undefined;
}

export function getContactChannelIcon(label: string): ContactIcon {
  const normalized = label.toLowerCase();

  if (normalized.includes("email")) {
    return EnvelopeClosedIcon;
  }

  if (normalized.includes("github")) {
    return GitHubLogoIcon;
  }

  if (normalized.includes("linkedin")) {
    return LinkedInLogoIcon;
  }

  if (normalized.includes("whatsapp")) {
    return ChatBubbleIcon;
  }

  return GlobeIcon;
}
