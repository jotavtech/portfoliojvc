import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/lab`, lastModified: now, priority: 0.7 },
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
