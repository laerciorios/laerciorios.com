import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MineButton } from "./components/MineButton";
import styles from "./not-found.module.css";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className={styles.page}>
      <div className={styles.display}>
        <span className={styles.digit}>4</span>
        <MineButton />
        <span className={styles.digit}>4</span>
      </div>

      <div className={styles.message}>
        <p className={styles.title}>{t("title")}</p>
        <p className={styles.subtitle}>{t("subtitle")}</p>
      </div>

      <Link href="/" className={styles.back}>
        {t("backHome")}
      </Link>
    </div>
  );
}
