import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import HeaderItem from "./components/HeaderItem";
import styles from "./styles.module.css";
import LogoIcon from "./components/LogoIcon";
import ThemeSwitchButton from "./components/ThemeSwitchButton";
import LanguageButton from "./components/LanguageButton";
import MobileMenu from "./components/MobileMenu";
import Typography from "../Typography";

export default async function Header() {
  const t = await getTranslations("navigation");

  const navItems = [
    { text: t("home.label"), href: "/" },
    { text: t("projects.label"), href: "/projects" },
    { text: t("articles.label"), href: "/articles" },
    // Hidden until the pages have real content; still reachable by URL.
    // { text: t("setup.label"), href: "/setup" },
    // { text: t("recommendations.label"), href: "/recommendations" },
  ];

  return (
    <nav className={styles.header}>
      <div className={styles.leftSection}>
        <Link className={styles.logo} href="/" aria-label="Laercio Rios — Home">
          <LogoIcon aria-hidden />
          <Typography
            className={styles.logoName}
            variant="body1"
            as="span"
            aria-hidden
          >
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
