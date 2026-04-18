import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { locales } from "@/i18n/config";
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

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Laercio Rios",
    template: "%s | Laercio Rios",
  },
  description:
    "Laercio Rios — Fullstack software developer building products with care. Portfolio, projects, articles and more.",
  authors: [{ name: "Laercio Rios", url: BASE_URL }],
  creator: "Laercio Rios",
  openGraph: {
    type: "website",
    siteName: "Laercio Rios",
    locale: "en_US",
    alternateLocale: "pt_BR",
  },
  twitter: {
    card: "summary",
    creator: "@laerciorios",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

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
            <div className="pageContent">{children}</div>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
