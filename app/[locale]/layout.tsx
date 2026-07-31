import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { locales } from "@/i18n/config";
import { localizedUrl } from "@/i18n/utils";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from "next-themes";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const BASE_URL = "https://laerciorios.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const description = t("siteDescription.label");
  const isPtBR = locale === "pt-BR";

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: "Laercio Rios",
      template: "%s | Laercio Rios",
    },
    description,
    authors: [{ name: "Laercio Rios", url: BASE_URL }],
    creator: "Laercio Rios",
    openGraph: {
      type: "website",
      url: localizedUrl(locale),
      siteName: "Laercio Rios",
      title: "Laercio Rios",
      description,
      locale: isPtBR ? "pt_BR" : "en_US",
      alternateLocale: isPtBR ? "en_US" : "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      site: "@laerciorios",
      creator: "@laerciorios",
      title: "Laercio Rios",
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className={`${spaceMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="data-theme">
            <Header />
            <main className="pageContent">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
