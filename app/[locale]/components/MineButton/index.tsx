"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Mine } from "@/app/components/icons";
import styles from "./MineButton.module.css";

export function MineButton() {
  const [clicks, setClicks] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const router = useRouter();

  function handleClick() {
    const next = clicks + 1;
    setAnimKey((k) => k + 1);
    if (next >= 3) {
      router.push("/minesweeper");
      return;
    }
    setClicks(next);
  }

  return (
    <button
      key={animKey}
      className={`${styles.mine} ${clicks > 0 ? styles.shake : ""}`}
      onClick={handleClick}
      aria-label="Mine"
    >
      <Mine width="1em" height="1em" style={{ fontSize: "clamp(6rem, 20vw, 10rem)" }} />
    </button>
  );
}
