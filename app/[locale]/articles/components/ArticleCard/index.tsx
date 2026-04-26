import Link from "next/link";
import Image from "next/image";
import { getFormatter } from "next-intl/server";
import Typography from "@/app/components/Typography";
import { Newspaper } from "@/app/components/icons";
import styles from "./styles.module.css";
import type { ArticleMetadata } from "@/lib/articles";

interface ArticleCardProps {
  article: ArticleMetadata;
  locale: string;
}

export default async function ArticleCard({ article, locale }: ArticleCardProps) {
  const format = await getFormatter();
  const formattedDate = format.dateTime(new Date(article.date), "short");

  return (
    <Link href={`/articles/${article.slug}`} className={styles.card}>
      <div className={styles.thumbnail}>
        {article.thumbnail ? (
          <Image
            src={`/images/blog/${article.thumbnail}`}
            alt={article.title}
            width={80}
            height={80}
            className={styles.thumbnailImage}
          />
        ) : (
          <div className={styles.thumbnailPlaceholder}>
            <Newspaper width={28} height={28} className={styles.thumbnailIcon} />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.themeRow}>
          {article.theme && (
            <Typography variant="caption1" as="span" className={styles.theme}>
              {article.theme}
            </Typography>
          )}
          <Typography variant="body3" className={styles.date}>
            {formattedDate}
          </Typography>
        </div>
        <Typography variant="h4" as="h3" className={styles.title}>
          {article.title}
        </Typography>
        <Typography variant="body2" className={styles.description}>
          {article.description}
        </Typography>
      </div>
    </Link>
  );
}
