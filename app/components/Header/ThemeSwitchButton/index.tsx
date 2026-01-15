"use client";
import { useTheme } from "next-themes";

import { DarkIcon, LightIcon } from "../../icons";
import ButtonCustom from "../../ButtonCustom";

export default function ThemeSwitchButton() {
  const { theme, setTheme } = useTheme();
  const icon = theme === "light" ? <DarkIcon /> : <LightIcon />;

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return <ButtonCustom icon={icon} onClick={toggleTheme} />;
}
