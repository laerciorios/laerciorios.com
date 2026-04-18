import Link from "next/link";
import Image from "next/image";
import Typography from "@/app/components/Typography";
import Badge from "@/app/components/Badge";
import { Newspaper } from "@/app/components/icons";
import styles from "./styles.module.css";
import type { ArticleMetadata } from "@/lib/articles";

interface ArticleCardProps {
  article: ArticleMetadata;
  locale: string;
}

export default function ArticleCard({ article, locale }: ArticleCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/articles/${article.slug}`} className={styles.card}>
      <div className={styles.thumbnail}>
        {article.thumbnail ? (
          <Image
            src={`/images/blog/${article.thumbnail}`}
            alt={article.title}
            width={72}
            height={72}
            className={styles.thumbnailImage}
          />
        ) : (
          <div className={styles.thumbnailPlaceholder}>
            <Newspaper width={28} height={28} className={styles.thumbnailIcon} />
          </div>
        )}
      </div>

      <div className={styles.content}>
        {article.theme && <Badge label={article.theme} />}
        <Typography variant="h3" className={styles.title}>
          {article.title}
        </Typography>
        <Typography variant="body2" className={styles.description}>
          {article.description}
        </Typography>
      </div>

      <Typography variant="caption3" className={styles.date}>
        {formattedDate}
      </Typography>
    </Link>
  );
}
