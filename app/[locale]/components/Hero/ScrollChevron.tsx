"use client";

import { ChevronDown } from "@/app/components/icons";
import styles from "./styles.module.css";

export default function ScrollChevron() {
  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <button className={styles.chevron} onClick={handleClick} aria-label="Scroll down">
      <ChevronDown />
    </button>
  );
}
