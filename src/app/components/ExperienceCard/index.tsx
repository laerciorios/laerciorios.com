import { useTranslation } from "react-i18next";

import ArrowDownSvg from "../../assets/icons/arrow-down.svg";
import ArrowUpSvg from "../../assets/icons/arrow-up.svg";
import Typography from "../Typography";
import styles from "./styles.module.css";

interface ExperienceCardProps {
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  active?: boolean;
  hasOpenIcon?: boolean;
  onClick?: () => void;
}

export default function ExperienceCard({
  title,
  company,
  startDate,
  endDate,
  active,
  hasOpenIcon,
  onClick,
}: ExperienceCardProps) {
  const { t, i18n } = useTranslation();

  const startDateFormatted = new Intl.DateTimeFormat(i18n.language, {
    month: "2-digit",
    year: "numeric",
  }).format(startDate);
  const endDateFormatted = endDate
    ? new Intl.DateTimeFormat(i18n.language, {
        month: "2-digit",
        year: "numeric",
      }).format(endDate)
    : t(`general.current.label`);

  return (
    <div
      className={`${styles["experience"]} ${active ? styles["experience--active"] : ""}`}
      onClick={onClick}
    >
      <div className={styles["experience-content"]}>
        <Typography variant="caption2">{`${startDateFormatted} - ${endDateFormatted}`}</Typography>
        <div className={styles["experience-company"]}>
          <Typography variant="body1">{company}</Typography>
          <Typography variant="body2">
            {t(`data.experiences.${title}.location.label`)}
          </Typography>
        </div>
        <Typography variant="body3">
          {t(`data.experiences.${title}.position.label`)}
        </Typography>
      </div>
      {hasOpenIcon && (
        <div className={styles["experience-open_icon"]}>
          {active ? <ArrowUpSvg /> : <ArrowDownSvg />}
        </div>
      )}
    </div>
  );
}
