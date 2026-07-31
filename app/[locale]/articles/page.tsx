import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localizedUrl, ogLocale } from "@/i18n/utils";
import Typography from "@/app/components/Typography";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "./components/ArticleCard";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const [t, tMeta] = await Promise.all([
    getTranslations({ locale, namespace: "articles" }),
    getTranslations({ locale, namespace: "metadata" }),
  ]);

  return {
    title: t("pageTitle.label"),
    description: tMeta("articlesDescription.label"),
    alternates: {
      canonical: localizedUrl(locale, "/articles"),
      languages: {
        "x-default": "https://laerciorios.com/articles",
        en: "https://laerciorios.com/articles",
        "pt-BR": "https://laerciorios.com/pt-BR/articles",
      },
    },
    openGraph: {
      url: localizedUrl(locale, "/articles"),
      title: t("pageTitle.label"),
      description: tMeta("articlesDescription.label"),
      locale: ogLocale(locale),
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
          {t("pageTitle.label")}
        </Typography>
        <Typography variant="body2" className={styles.subtitle}>
          {t("pageSubtitle.label")}
        </Typography>
      </div>

      <div className={styles.section}>
        <Typography variant="h3" as="h2" className={styles.sectionTitle}>
          {t("allArticles.label")}
        </Typography>
        {articles.length === 0 ? (
          <Typography variant="body1" className={styles.empty}>
            {t("emptyState.label")}
          </Typography>
        ) : (
          <div className={styles.grid}>
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
