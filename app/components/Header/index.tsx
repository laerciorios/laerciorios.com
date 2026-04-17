import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import HeaderItem from "./components/HeaderItem";
import styles from "./styles.module.css";
import LogoIcon from "./components/LogoIcon";
import ThemeSwitchButton from "./components/ThemeSwitchButton";
import LanguageButton from "./components/LanguageButton";
import MobileMenu from "./components/MobileMenu";
import Typography from "../Typography";

export default async function Header() {
  const [t, locale] = await Promise.all([
    getTranslations("navigation"),
    getLocale(),
  ]);

  const navItems = [
    { text: t("home"), href: `/${locale}` },
    { text: t("projects"), href: `/${locale}/projects` },
    { text: t("articles"), href: `/${locale}/articles` },
  ];

  return (
    <nav className={styles.header}>
      <div className={styles.leftSection}>
        <Link className={styles.logo} href={`/${locale}`}>
          <LogoIcon />
          <Typography className={styles.logoName} variant="body1" as="span">
            Laercio Rios
          </Typography>
        </Link>
      </div>
      <div className={styles.centerSection}>
        {navItems.map((item) => (
          <HeaderItem key={item.href} text={item.text} href={item.href} />
        ))}
      </div>
      <div className={styles.rightSection}>
        <LanguageButton />
        <ThemeSwitchButton />
        <div className={styles.menuButton}>
          <MobileMenu navItems={navItems} ariaLabel="Menu" />
        </div>
      </div>
    </nav>
  );
}
