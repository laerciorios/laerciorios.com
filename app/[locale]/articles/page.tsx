import { getTranslations } from "next-intl/server";

export default async function Articles() {
  const t = await getTranslations("articles");

  return (
    <>
      <h1>{t("title")}</h1>
    </>
  );
}
