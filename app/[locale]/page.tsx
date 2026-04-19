import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localizedUrl } from "@/i18n/utils";
import Hero from "./components/Hero";
import About from "./components/About";
import Formations from "./components/Formations";
import Experiences from "./components/Experiences";
import FeaturedProjects from "./components/FeaturedProjects";
import Talks from "./components/Talks";
import SectionHeader from "@/app/components/SectionHeader";
import styles from "./page.module.css";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: { absolute: "Laercio Rios" },
    description: t("heroSubtitle"),
    alternates: {
      canonical: localizedUrl(locale),
      languages: {
        "x-default": "https://laerciorios.com",
        en: "https://laerciorios.com",
        "pt-BR": "https://laerciorios.com/pt-BR",
      },
    },
    openGraph: {
      url: localizedUrl(locale),
      title: t("name"),
      description: t("heroSubtitle"),
    },
  };
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div className={styles.homePage}>
      <Hero name={t("name")} jobTitle={t("jobTitle")} />

      <div className={styles.sections}>
        <About />

        <section className={styles.section}>
          <FeaturedProjects />
        </section>

        <section className={styles.section}>
          <Experiences />
        </section>

        <section className={`${styles.section} ${styles.sectionWithTitle}`}>
          <SectionHeader title={t("formationsTitle")} />
          <Formations locale={locale} />
        </section>

        <section className={`${styles.section} ${styles.sectionWithTitle}`}>
          <SectionHeader title={t("talksTitle")} />
          <Talks locale={locale} />
        </section>
      </div>
    </div>
  );
}
