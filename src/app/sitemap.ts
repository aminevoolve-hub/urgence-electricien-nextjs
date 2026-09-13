import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { blogPosts } from "@/lib/blog";
import { localPages } from "@/lib/local-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/a-propos", "/services", "/realisations", "/blog", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: new Date(),
  }));

  const localRoutes = localPages.map((p) => ({
    url: `${site.url}/${p.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...serviceRoutes, ...localRoutes, ...blogRoutes];
}
