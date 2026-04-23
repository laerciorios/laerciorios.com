"use client";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { DarkIcon, LightIcon } from "../../../icons";
import ButtonCustom from "../../../ButtonCustom";

export default function ThemeSwitchButton() {
  const t = useTranslations("theme");
  const { theme, setTheme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";
  const icon = currentTheme === "light" ? <DarkIcon /> : <LightIcon />;
  const ariaLabel =
    currentTheme === "light"
      ? t("switchToDark.label")
      : t("switchToLight.label");

  function toggleTheme() {
    setTheme(currentTheme === "light" ? "dark" : "light");
  }

  return (
    <ButtonCustom icon={icon} onClick={toggleTheme} aria-label={ariaLabel} />
  );
}
