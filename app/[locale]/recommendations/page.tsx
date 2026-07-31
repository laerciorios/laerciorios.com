import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { localizedUrl, ogLocale } from "@/i18n/utils";
import Typography from "@/app/components/Typography";
import { Link as LinkIcon } from "@/app/components/icons";
import { bookCategories } from "@/data/recommendations";
import styles from "./styles.module.css";

interface RecommendationsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: RecommendationsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("recommendationsTitle.label"),
    description: t("recommendationsDescription.label"),
    alternates: {
      canonical: localizedUrl(locale, "/recommendations"),
      languages: {
        "x-default": "https://laerciorios.com/recommendations",
        en: "https://laerciorios.com/recommendations",
        "pt-BR": "https://laerciorios.com/pt-BR/recommendations",
      },
    },
    openGraph: {
      url: localizedUrl(locale, "/recommendations"),
      title: `${t("recommendationsTitle.label")} — Laercio Rios`,
      description: t("recommendationsDescription.label"),
      locale: ogLocale(locale),
    },
  };
}

function BookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

export default async function Recommendations({
  params,
}: RecommendationsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "recommendations" });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="h1" className={styles.pageTitle}>
          {t("title.label")}
        </Typography>
        <Typography variant="body2" className={styles.subtitle}>
          {t("subtitle.label")}
        </Typography>
      </div>

      <Typography variant="body3" className={styles.wip}>
        {t("wip.label")}
      </Typography>

      {bookCategories.map((category) => (
        <section key={category.key} className={styles.section}>
          <Typography variant="h3" as="h2" className={styles.sectionTitle}>
            {t(`categories.${category.key}.label`)}
          </Typography>
          <div className={styles.list}>
            {category.items.map((item) => {
              const title = t(`items.${item.key}.title.label`);

              return (
                <article key={item.key} className={styles.card}>
                  <div className={styles.cover}>
                    {item.cover ? (
                      <Image
                        src={`/images/books/${item.cover}`}
                        alt={title}
                        fill
                        sizes="96px"
                        className={styles.coverImage}
                      />
                    ) : (
                      <div className={styles.coverPlaceholder}>
                        <BookIcon />
                        <span className={styles.coverCaption}>
                          {t("coverPlaceholder.label")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={styles.body}>
                    <Typography
                      variant="body1"
                      as="h3"
                      className={styles.bookTitle}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="caption2"
                      as="span"
                      className={styles.bookAuthor}
                    >
                      {t(`items.${item.key}.author.label`)}
                    </Typography>
                    <Typography variant="body2" className={styles.bookComment}>
                      {t(`items.${item.key}.description.label`)}
                    </Typography>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.itemLink}
                      >
                        <LinkIcon />
                        {t("seeBook.label")}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
