import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n/config";
import { localizedUrl } from "@/i18n/utils";
import { getAllArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const staticRoutes = ["", "/projects", "/articles"];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, route),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, localizedUrl(l, route)])
        ),
      },
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" && locale === defaultLocale ? 1 : 0.8,
    }))
  );

  const articleEntries: MetadataRoute.Sitemap = articles.flatMap((article) =>
    locales.map((locale) => ({
      url: article.canonical_url ?? localizedUrl(locale, `/articles/${article.slug}`),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, localizedUrl(l, `/articles/${article.slug}`)])
        ),
      },
      lastModified: new Date(article.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...articleEntries];
}
