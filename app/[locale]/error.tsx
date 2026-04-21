"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Typography from "@/app/components/Typography";
import styles from "./error.module.css";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations("error500");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.page} role="alert" aria-live="assertive">
      <Typography variant="h1" className={styles.code}>
        500
      </Typography>

      <div className={styles.message}>
        <Typography variant="body1">{t("title")}</Typography>
        <Typography variant="body2" className={styles.subtitle}>
          {t("subtitle")}
        </Typography>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.retry} onClick={reset}>
          {t("tryAgain")}
        </button>

        <Link href="/" className={styles.back}>
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
