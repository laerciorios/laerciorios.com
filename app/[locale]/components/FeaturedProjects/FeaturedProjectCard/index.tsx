import Image from "next/image";
import NextLink from "next/link";
import { Link, Github } from "@/app/components/icons";
import Typography from "@/app/components/Typography";
import styles from "./styles.module.css";

interface FeaturedProjectCardProps {
  title: string;
  description: string;
  year: string;
  image?: string;
  link?: string;
  repository?: string;
}

export default function FeaturedProjectCard({
  title,
  description,
  year,
  image,
  link,
  repository,
}: FeaturedProjectCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className={styles.thumbnail}
          />
        ) : (
          <div className={styles.thumbnailPlaceholder} />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <Typography variant="h4" as="h3" className={styles.name}>
            {title}
          </Typography>
          <Typography variant="body1" className={styles.year}>
            {year}
          </Typography>
        </div>

        <Typography variant="body2" className={styles.description}>
          {description}
        </Typography>

        <div className={styles.links}>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              <Link className={styles.linkIcon} aria-hidden />
              <Typography variant="caption2" as="span" className={styles.linkLabel}>
                PAGE
              </Typography>
            </a>
          )}
          {repository && (
            <a
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              <Github className={styles.linkIcon} aria-hidden />
              <Typography variant="caption2" as="span" className={styles.linkLabel}>
                GITHUB
              </Typography>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
