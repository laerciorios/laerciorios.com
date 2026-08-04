import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleMetadata {
  title: string;
  description: string;
  slug: string;
  date: string;
  theme?: string;
  thumbnail?: string;
  canonical_url?: string;
  featured?: boolean;
}

export interface Article extends ArticleMetadata {
  content: string;
}

const articlesDir = path.join(process.cwd(), "articles");

export function getAllArticles(): ArticleMetadata[] {
  if (!fs.existsSync(articlesDir)) return [];

  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));

  const articles = files.map((filename) => {
    const raw = fs.readFileSync(path.join(articlesDir, filename), "utf8");
    const { data } = matter(raw);
    return data as ArticleMetadata;
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Articles to surface on the home page: every article flagged as `featured` in
 * its front matter, followed by the most recent ones that aren't already there.
 */
export function getHighlightedArticles(latestCount = 3): ArticleMetadata[] {
  const articles = getAllArticles();
  const featured = articles.filter((article) => article.featured);
  const featuredSlugs = new Set(featured.map((article) => article.slug));

  const latest = articles
    .filter((article) => !featuredSlugs.has(article.slug))
    .slice(0, latestCount);

  return [...featured, ...latest];
}

export function getArticleBySlug(slug: string): Article | null {
  if (!fs.existsSync(articlesDir)) return null;

  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));

  for (const filename of files) {
    const raw = fs.readFileSync(path.join(articlesDir, filename), "utf8");
    const { data, content } = matter(raw);
    if (data.slug === slug) {
      return { ...(data as ArticleMetadata), content };
    }
  }

  return null;
}
