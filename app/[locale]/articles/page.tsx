import { getTranslations } from "next-intl/server";
import Typography from "@/app/components/Typography";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "./components/ArticleCard";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Articles({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles" });
  const articles = getAllArticles();

  return (
    <>
      <Typography variant="h1">{t("title")}</Typography>
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
    </>
  );
}
