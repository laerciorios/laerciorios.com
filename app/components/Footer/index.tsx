import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Typography from "../Typography";
import LogoIcon from "../Header/components/LogoIcon";
import { Mail, Linkedin, Github } from "../icons";
import styles from "./styles.module.css";

export default async function Footer() {
  const [tFooter, tNav] = await Promise.all([
    getTranslations("footer"),
    getTranslations("navigation"),
  ]);

  const navItems = [
    { text: tNav("home.label"), href: "/" },
    { text: tNav("projects.label"), href: "/projects" },
    { text: tNav("articles.label"), href: "/articles" },
  ];

  const connections = [
    {
      icon: <Mail />,
      label: tFooter("email.label"),
      value: "contact@laerciorios.com",
      href: "mailto:contact@laerciorios.com",
    },
    {
      icon: <Linkedin />,
      label: tFooter("linkedin.label"),
      value: "/laerciorios",
      href: "https://linkedin.com/in/laerciorios",
    },
    {
      icon: <Github />,
      label: tFooter("github.label"),
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
            <Link
              className={styles.logo}
              href="/"
              aria-label="Laercio Rios — Home"
            >
              <LogoIcon aria-hidden />
              <Typography variant="body1" as="span" aria-hidden>
                Laercio Rios
              </Typography>
            </Link>
            <Typography variant="body2" className={styles.description}>
              {tFooter("description.label")}
            </Typography>
            <div className={styles.connections}>
              <Typography
                variant="body3"
                as="span"
                className={styles.sectionLabel}
              >
                {tFooter("connections.label")}
              </Typography>
              <div className={styles.connectionList}>
                {connections.map((item) => (
                  <a
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
                  </a>
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
              {tFooter("navigation.label")}
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
            {year} <span aria-hidden="true">·</span>{" "}
            {tFooter("authorName.label")}
          </Typography>
        </div>
      </div>
    </footer>
  );
}
