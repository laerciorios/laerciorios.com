import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import HeaderItem from "./components/HeaderItem";
import styles from "./styles.module.css";
import LogoIcon from "./components/LogoIcon";
import ThemeSwitchButton from "./ThemeSwitchButton";
import LanguageButton from "./LanguageButton";
import Typography from "../Typography";

export default async function Header() {
  const [t, locale] = await Promise.all([
    getTranslations("navigation"),
    getLocale(),
  ]);

  return (
    <nav className={styles.header}>
      <div className={styles.leftSection}>
        <Link className={styles.logo} href={`/${locale}`}>
          <LogoIcon />
          <Typography variant="body1" as="span">Laercio Rios</Typography>
        </Link>
      </div>
      <div className={styles.centerSection}>
        <HeaderItem text={t("home")} href={`/${locale}`} />
        <HeaderItem text={t("about")} href={`/${locale}/about`} />
        <HeaderItem text={t("projects")} href={`/${locale}/projects`} />
        <HeaderItem text={t("articles")} href={`/${locale}/articles`} />
      </div>
      <div className={styles.rightSection}>
        <LanguageButton />
        <ThemeSwitchButton />
      </div>
    </nav>
  );
}
