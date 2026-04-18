import { getTranslations, getFormatter } from "next-intl/server";
import { experiences } from "@/data/experiences";
import ExperienceCard from "./ExperienceCard";
import styles from "./styles.module.css";

export default async function Experiences() {
  const t = await getTranslations("experiences");
  const format = await getFormatter();

  return (
    <div className={styles.list}>
      {experiences.map((exp, index) => {
        const startFormatted = format.dateTime(exp.startDate, "monthYear");
        const endFormatted = exp.endDate
          ? format.dateTime(exp.endDate, "monthYear")
          : t("current");
        const dateRange = `${startFormatted} - ${endFormatted}`;

        return (
          <ExperienceCard
            key={exp.title}
            companyKey={exp.title}
            company={exp.company}
            dateRange={dateRange}
            position={t(`${exp.title}.position.label`)}
            location={t(`${exp.title}.location.label`)}
            description={t(`${exp.title}.description.label`)}
            about={t(`${exp.title}.about.label`)}
            responsibilities={t(`${exp.title}.responsibilities.label`)}
            stack={exp.stack}
            isLast={index === experiences.length - 1}
            seeMoreLabel={t("seeMore")}
            seeLessLabel={t("seeLess")}
            aboutLabel={t("aboutLabel")}
            responsibilitiesLabel={t("responsibilitiesLabel")}
            stackLabel={t("stackLabel")}
          />
        );
      })}
    </div>
  );
}
