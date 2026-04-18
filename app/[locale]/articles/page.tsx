import { getTranslations, getLocale } from "next-intl/server";
import Typography from "@/app/components/Typography";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "./components/ArticleCard";
import styles from "./page.module.css";

export default async function Articles() {
  const t = await getTranslations("articles");
  const locale = await getLocale();
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
