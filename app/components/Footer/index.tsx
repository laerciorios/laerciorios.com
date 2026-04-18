import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import Typography from "../Typography";
import LogoIcon from "../Header/components/LogoIcon";
import { Mail, Linkedin, Github } from "../icons";
import styles from "./styles.module.css";

export default async function Footer() {
  const [tFooter, tNav, locale] = await Promise.all([
    getTranslations("footer"),
    getTranslations("navigation"),
    getLocale(),
  ]);

  const navItems = [
    { text: tNav("home"), href: `/${locale}` },
    { text: tNav("projects"), href: `/${locale}/projects` },
    { text: tNav("articles"), href: `/${locale}/articles` },
  ];

  const connections = [
    {
      icon: <Mail />,
      label: tFooter("email"),
      value: "contact@laerciorios.com",
      href: "mailto:contact@laerciorios.com",
    },
    {
      icon: <Linkedin />,
      label: tFooter("linkedin"),
      value: "/laerciorios",
      href: "https://linkedin.com/in/laerciorios",
    },
    {
      icon: <Github />,
      label: tFooter("github"),
      value: "/laerciorios",
      href: "https://github.com/laerciorios",
    },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <Link className={styles.logo} href={`/${locale}`}>
              <LogoIcon />
              <Typography variant="body1" as="span">
                Laercio Rios
              </Typography>
            </Link>
            <Typography variant="body2" className={styles.description}>
              {tFooter("description")}
            </Typography>
            <div className={styles.connections}>
              <Typography
                variant="body3"
                as="span"
                className={styles.sectionLabel}
              >
                {tFooter("connections")}
              </Typography>
              <div className={styles.connectionList}>
                {connections.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={styles.connectionItem}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.connectionIcon}>{item.icon}</span>
                    <div className={styles.connectionInfo}>
                      <Typography variant="body1">{item.label}</Typography>
                      <Typography
                        variant="caption2"
                        className={styles.connectionValue}
                      >
                        {item.value}
                      </Typography>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.rightSection}>
            <Typography
              variant="body3"
              as="span"
              className={styles.sectionLabel}
            >
              {tFooter("navigation")}
            </Typography>
            <nav className={styles.navList}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navItem}
                >
                  <Typography variant="body1" as="span">
                    {item.text}
                  </Typography>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className={styles.bottom}>
          <Typography variant="body3" className={styles.copyright}>
            {year} {tFooter("authorName")}
          </Typography>
        </div>
      </div>
    </footer>
  );
}
