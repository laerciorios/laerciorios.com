import { getTranslations } from "next-intl/server";
import Hero from "./components/Hero";
import About from "./components/About";
import SectionHeader from "@/app/components/SectionHeader";
import styles from "./page.module.css";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div className={styles.homePage}>
      <Hero name={t("name")} jobTitle={t("jobTitle")} />

      <div className={styles.sections}>
        <About />

        <section>
          <SectionHeader title="Featured Projects" />
          <div />
        </section>

        <section>
          <SectionHeader title="Experiences" />
          <div />
        </section>

        <section>
          <SectionHeader title="Formations" />
          <div />
        </section>

        <section>
          <SectionHeader title="Presentations" />
          <div />
        </section>
      </div>
    </div>
  );
}
