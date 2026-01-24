"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import HeaderItem from "./components/HeaderItem";
import styles from "./styles.module.css";
import LogoIcon from "./components/LogoIcon";
import ThemeSwitchButton from "./ThemeSwitchButton";
import LanguageButton from "./LanguageButton";

export default function Header() {
  const t = useTranslations("navigation");

  return (
    <nav className={styles.header}>
      <div className={styles.leftSection}>
        <Link href="/">
          <LogoIcon />
        </Link>
      </div>
      <div className={styles.centerSection}>
        <HeaderItem text={t("home")} href="/" />
        <HeaderItem text={t("about")} href="/about" />
        <HeaderItem text={t("projects")} href="/projects" />
        <HeaderItem text={t("articles")} href="/articles" />
      </div>
      <div className={styles.rightSection}>
        <LanguageButton />
        <ThemeSwitchButton />
      </div>
    </nav>
  );
}
