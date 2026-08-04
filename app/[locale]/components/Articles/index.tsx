import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "@/app/components/icons";
import Typography from "@/app/components/Typography";
import ArticleCard from "@/app/components/ArticleCard";
import { getHighlightedArticles } from "@/lib/articles";
import styles from "./styles.module.css";

interface ArticlesProps {
  locale: string;
}

export default async function Articles({ locale }: ArticlesProps) {
  const t = await getTranslations({ locale, namespace: "home" });
  const articles = getHighlightedArticles();

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Typography variant="h2" as="h2" className={styles.title}>
          {t("articlesTitle.label")}
        </Typography>
        <Link href="/articles" className={styles.seeAll}>
          <Typography variant="body1" as="span" className={styles.seeAllLabel}>
            {t("seeAllArticles.label")}
          </Typography>
          <ArrowRight className={styles.seeAllIcon} aria-hidden />
        </Link>
      </div>

      <div className={styles.list}>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} locale={locale} />
        ))}
      </div>
    </div>
  );
}
