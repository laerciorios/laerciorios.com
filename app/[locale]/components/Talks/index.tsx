import { getTranslations, getFormatter } from "next-intl/server";
import { talks } from "@/data/talks";
import TalkCard from "./TalkCard";
import styles from "./styles.module.css";

interface TalksProps {
  locale: string;
}

export default async function Talks({ locale }: TalksProps) {
  const t = await getTranslations({ locale, namespace: "talks" });
  const format = await getFormatter();

  return (
    <div className={styles.grid}>
      {talks.map((talk) => {
        const key = talk.title;
        return (
          <TalkCard
            key={key}
            link={talk.link}
            date={format.dateTime(talk.date, "long")}
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
