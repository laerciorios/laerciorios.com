"use client";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import pt from "./locales/pt.json";

const options = {
  // Order and from where user language should be detected.
  order: ["querystring", "localStorage", "navigator", "path"],

  // Keys or params to lookup language from:
  lookupQuerystring: "lng",
  lookupLocalStorage: "i18nextLng",
  lookupFromPathIndex: 0,

  // Cache user language on:
  caches: ["localStorage"],

  // Only detect languages that are in the whitelist.
  checkWhitelist: true,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
    },
    fallbackLng: ["en"],
    supportedLngs: ["pt", "en"],
    detection: options,

    interpolation: {
      escapeValue: false,
      // Format items to each language format.
      format(value, format, lng) {
        if (format === "number" && value) return value.toLocaleString(lng);

        if (format === "roundNumber" && value) {
          value = Math.round(value);
          return value.toLocaleString(lng);
        }

        return value;
      },
    },
  });

export default i18n;
