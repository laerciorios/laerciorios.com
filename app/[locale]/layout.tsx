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

export const metadata: Metadata = {
  title: "Laercio Rios",
  description: "Portfolio website of Laercio Rios",
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
