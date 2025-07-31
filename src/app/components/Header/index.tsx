import dynamic from "next/dynamic";
import Link from "next/link";

import ArrowLeft from "../../assets/icons/arrow-left.svg";
import BuyMeACoffee from "../BuyMeACoffee";
import LanguageSwitch from "../LanguageSwitch";
import styles from "./styles.module.css";

const ThemeSwitch = dynamic(() => import("../ThemeSwitch"), {
  ssr: false,
});

interface HeaderProps {
  hasBackButton?: boolean;
}

export default function Header({ hasBackButton }: HeaderProps) {
  return (
    <nav
      className={`${styles.header} ${hasBackButton ? styles["header--transparent"] : ""}`}
    >
      <div className={styles["nav-wrapper"]}>
        <ul className={styles["header-side_left"]}>
          {hasBackButton && (
            <Link href="/">
              <ArrowLeft />
            </Link>
          )}
        </ul>
        <ul className={styles["header-side_right"]}>
          <li>
            <BuyMeACoffee />
          </li>
          <li>
            <LanguageSwitch />
          </li>
          <li>
            <ThemeSwitch />
          </li>
        </ul>
      </div>
    </nav>
  );
}
