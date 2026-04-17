"use client";
import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

import { Languages, ChevronDown } from "../../../icons";
import { languages, type Locale } from "../../../../../i18n/config";
import styles from "./styles.module.css";
import Typography from "@/app/components/Typography";

export default function LanguageButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleLanguageChange(languageCode: Locale) {
    router.replace(pathname, { locale: languageCode });
    setIsDropdownOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isDropdownOpen]);

  const localeLabel = locale.split("-")[0].toUpperCase();

  return (
    <div className={styles.languageButtonContainer} ref={buttonRef}>
      <button
        className={styles.languageButton}
        onClick={toggleDropdown}
        aria-label={t("switch")}
      >
        <Languages />
        <Typography variant="body1">{localeLabel}</Typography>
        <ChevronDown
          className={`${styles.chevron} ${isDropdownOpen ? styles.chevronOpen : ""}`}
        />
      </button>

      {isDropdownOpen && (
        <div
          className={styles.dropdown}
          ref={dropdownRef}
          role="menu"
          aria-orientation="vertical"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              className={`${styles.dropdownItem} ${
                locale === language.code ? styles.active : ""
              }`}
              onClick={() => handleLanguageChange(language.code)}
              role="menuitemradio"
              aria-checked={locale === language.code}
            >
              {language.label}
              {locale === language.code && (
                <span className={styles.checkmark} aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
