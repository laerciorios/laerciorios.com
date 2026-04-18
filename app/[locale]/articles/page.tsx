import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Typography from "@/app/components/Typography";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "./components/ArticleCard";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles" });

  return {
    title: t("pageTitle"),
    description: "Articles and writings by Laercio Rios on software development.",
    alternates: {
      canonical: `https://laerciorios.com/${locale}/articles`,
      languages: {
        en: "https://laerciorios.com/en/articles",
        "pt-BR": "https://laerciorios.com/pt-BR/articles",
      },
    },
    openGraph: {
      url: `https://laerciorios.com/${locale}/articles`,
      title: t("pageTitle"),
    },
  };
}

export default async function Articles({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles" });
  const articles = getAllArticles();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="h1" className={styles.pageTitle}>
          {t("pageTitle")}
        </Typography>
        <Typography variant="body2" className={styles.subtitle}>
          {t("pageSubtitle")}
        </Typography>
      </div>

      <div className={styles.section}>
        <Typography variant="h3" as="h2" className={styles.sectionTitle}>
          {t("allArticles")}
        </Typography>
        {articles.length === 0 ? (
          <Typography variant="body1" className={styles.empty}>
            {t("emptyState")}
          </Typography>
        ) : (
          <div className={styles.grid}>
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
