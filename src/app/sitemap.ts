import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    "/portfolio",
    "/portfolio/sobre",
    "/portfolio/projetos",
    "/portfolio/contato",
  ];

  const staticEntries = pages.map((path) => ({
    url: `${siteConfig.baseUrl}${path}`,
    lastModified: now,
  }));

  const projectEntries = getProjectSlugs().map((slug) => ({
    url: `${siteConfig.baseUrl}/portfolio/projetos/${slug}`,
    lastModified: now,
  }));

  return [...staticEntries, ...projectEntries];
}
