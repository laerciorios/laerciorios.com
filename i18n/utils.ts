import { defaultLocale } from "./config";

const BASE_URL = "https://laerciorios.com";

export function localizedUrl(locale: string, path: string = "") {
  return locale === defaultLocale
    ? `${BASE_URL}${path}`
    : `${BASE_URL}/${locale}${path}`;
}
