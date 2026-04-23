import { getTranslations, getFormatter, getLocale } from "next-intl/server";
import { experiences } from "@/data/experiences";
import Typography from "@/app/components/Typography";
import { ArrowRight } from "@/app/components/icons";
import ExperienceCard from "./ExperienceCard";
import styles from "./styles.module.css";

export default async function Experiences() {
  const t = await getTranslations("experiences");
  const tHome = await getTranslations("home");
  const format = await getFormatter();
  const locale = await getLocale();

  const cvFile = locale === "pt-BR" ? "pt" : "en";

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Typography variant="h2" as="h2" className={styles.title}>
          {tHome("experiencesTitle.label")}
        </Typography>
        <a
          href={`/cv/${cvFile}.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cvLink}
        >
          {t("seeFullResume.label")}
          <ArrowRight width={24} height={24} />
        </a>
      </div>
      <div className={styles.list}>
      {experiences.map((exp, index) => {
        const startFormatted = format.dateTime(exp.startDate, "monthYear");
        const endFormatted = exp.endDate
          ? format.dateTime(exp.endDate, "monthYear")
          : t("current.label");
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
            seeMoreLabel={t("seeMore.label")}
            seeLessLabel={t("seeLess.label")}
            aboutLabel={t("aboutLabel.label")}
            responsibilitiesLabel={t("responsibilitiesLabel.label")}
            stackLabel={t("stackLabel.label")}
          />
        );
      })}
      </div>
    </div>
  );
}
