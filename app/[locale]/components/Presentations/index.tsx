import { getTranslations, getFormatter } from "next-intl/server";
import { presentations } from "@/data/presentations";
import PresentationCard from "./PresentationCard";
import styles from "./styles.module.css";

interface PresentationsProps {
  locale: string;
}

export default async function Presentations({ locale }: PresentationsProps) {
  const t = await getTranslations({ locale, namespace: "presentations" });
  const format = await getFormatter();

  return (
    <div className={styles.grid}>
      {presentations.map((presentation) => {
        const key = presentation.title;
        return (
          <PresentationCard
            key={key}
            link={presentation.link}
            date={format.dateTime(presentation.date, "long")}
            title={t(`${key}.title.label`)}
            event={t(`${key}.event.label`)}
            localization={t(`${key}.localization.label`)}
            description={t(`${key}.description.label`)}
          />
        );
      })}
    </div>
  );
}
