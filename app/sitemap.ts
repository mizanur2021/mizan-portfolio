import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPortfolioProjects } from "@/lib/get-portfolio-data";

/**
 * Hash-fragment URLs (`/#section`) are never sent to the server and are
 * collapsed to the base document by crawlers, so they don't belong here as
 * separate entries — this previously listed the homepage 6 times under
 * different fake "pages". Individual /work/[slug] project pages are real,
 * independently indexable routes, so they're listed below.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPortfolioProjects();

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${site.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${site.url}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}
