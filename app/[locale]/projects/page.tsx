import { getTranslations } from "next-intl/server";

export default async function Projects() {
  const t = await getTranslations("projects");

  return (
    <>
      <h1>{t("title")}</h1>
    </>
  );
}
