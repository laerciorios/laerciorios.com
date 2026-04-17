import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <main>
      <h1>{t("heroTitle")}</h1>
      <p>{t("heroSubtitle")}</p>
    </main>
  );
}
