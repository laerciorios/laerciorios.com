import { changeLanguage } from "i18next";
import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

import LanguageSvg from "../../assets/icons/language.svg";
import ButtonCustom from "../ButtonCustom";
import Typography from "../Typography";
import styles from "./styles.module.css";

export default function LanguageSwitch() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();
  const currentLanguage = i18next.language;

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleToggleLanguage(lng: "en" | "pt") {
    changeLanguage(lng);
    setIsOpen(false);
  }

  return (
    <div>
      <ButtonCustom icon={<LanguageSvg />} onClick={handleClick} />
      {isOpen && (
        <ul className={styles["language-switch__list"]}>
          <li
            className={`${styles["language-switch__item"]} ${currentLanguage === "en" && styles["language-switch__item--active"]}`}
            onClick={() => handleToggleLanguage("en")}
          >
            <Typography variant="body2">{t("languages.en.label")}</Typography>
          </li>
          <li
            className={`${styles["language-switch__item"]} ${currentLanguage === "pt" && styles["language-switch__item--active"]}`}
            onClick={() => handleToggleLanguage("pt")}
          >
            <Typography variant="body2">{t("languages.pt.label")}</Typography>
          </li>
        </ul>
      )}
    </div>
  );
}
