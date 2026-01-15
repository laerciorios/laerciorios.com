import Link from "next/link";
import HeaderItem from "./components/HeaderItem";
import styles from "./styles.module.css";
import LogoIcon from "./components/LogoIcon";
import ThemeSwitchButton from "./ThemeSwitchButton";

export default function Header() {
  return (
    <nav className={styles.header}>
      <div className={styles.leftSection}>
        <Link href="/">
          <LogoIcon />
        </Link>
      </div>
      <div className={styles.centerSection}>
        <HeaderItem text="Home" href="/" />
        <HeaderItem text="About" href="/about" />
        <HeaderItem text="Projects" href="/projects" />
        <HeaderItem text="Articles" href="/articles" />
      </div>
      <div className={styles.rightSection}>
        <ThemeSwitchButton />
      </div>
    </nav>
  );
}
