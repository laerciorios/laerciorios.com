import { notFound } from "next/navigation";
import { getTranslations, getFormatter } from "next-intl/server";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Typography from "@/app/components/Typography";
import {
  CodeBlock,
  Blockquote,
  ArticleTable,
  ArticleImage,
} from "@/app/components/markdown";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import Badge from "@/app/components/Badge";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return {};

  const canonical =
    article.canonical_url ||
    `https://laerciorios.com/${locale}/articles/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: "Laercio Rios" }],
    alternates: {
      canonical,
      languages: {
        en: `https://laerciorios.com/en/articles/${slug}`,
        "pt-BR": `https://laerciorios.com/pt-BR/articles/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      authors: ["Laercio Rios"],
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles" });
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const format = await getFormatter();
  const formattedDate = format.dateTime(new Date(article.date), "long");

  return (
    <article className={styles.article}>
      <Link href="/articles" className={styles.back}>
        ← {t("backToArticles")}
      </Link>

      <header className={styles.header}>
        <div className={styles.meta}>
          <Typography variant="body1" className={styles.date}>
            {formattedDate}
          </Typography>
          {article.theme && (
            <>
              <span className={styles.dot} aria-hidden="true">·</span>
              <Badge label={article.theme} />
            </>
          )}
        </div>
        <Typography variant="h1" className={styles.title}>
          {article.title}
        </Typography>
        <Typography variant="h3" className={styles.description}>
          {article.description}
        </Typography>
      </header>

      <div className={styles.body}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <Typography variant="h1">{children}</Typography>
            ),
            h2: ({ children }) => (
              <Typography variant="h2">{children}</Typography>
            ),
            h3: ({ children }) => (
              <Typography variant="h3">{children}</Typography>
            ),
            h4: ({ children }) => (
              <Typography variant="h4">{children}</Typography>
            ),
            p: ({ children }) => (
              <Typography variant="body2" className={styles.paragraph}>{children}</Typography>
            ),
            code: ({ className, children }) => (
              <CodeBlock className={className}>{children}</CodeBlock>
            ),
            blockquote: ({ children }) => (
              <Blockquote>{children}</Blockquote>
            ),
            table: ({ children }) => (
              <ArticleTable>{children}</ArticleTable>
            ),
            img: ({ src, alt }) => (
              <ArticleImage src={typeof src === "string" ? src : undefined} alt={alt} />
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className={styles.link}
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
