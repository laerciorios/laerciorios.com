import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getAllArticles } from "@/lib/articles";

const BASE_URL = "https://laerciorios.com";

function url(path: string) {
  return `${BASE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const staticRoutes = ["", "/projects", "/articles"];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: url(`/${locale}${route}`),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, url(`/${l}${route}`)])
        ),
      },
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    }))
  );

  const articleEntries: MetadataRoute.Sitemap = articles.flatMap((article) =>
    locales.map((locale) => ({
      url: article.canonical_url ?? url(`/${locale}/articles/${article.slug}`),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, url(`/${l}/articles/${article.slug}`)])
        ),
      },
      lastModified: new Date(article.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...articleEntries];
}
