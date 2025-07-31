import { useTranslation } from "react-i18next";

import Typography from "../Typography";
import styles from "./styles.module.css";

interface PresentationCardProps {
  title: string;
  link: string;
  date: Date;
}

export default function PresentationCard({
  title,
  date,
  link,
}: PresentationCardProps) {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles["presentation"]}>
      <iframe
        src={link}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      ></iframe>
      <div className={styles["presentation-info"]}>
        <div className={styles["presentation-info-header"]}>
          <Typography variant="h4">
            {t(`data.presentations.${title}.title.label`)}
          </Typography>
          <Typography variant="body1">
            {t(`data.presentations.${title}.event.label`)}
          </Typography>
          <Typography variant="caption2">
            {new Intl.DateTimeFormat(i18n.language, {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(date)}
          </Typography>
        </div>
        <Typography variant="body2">
          {t(`data.presentations.${title}.description.label`)}
        </Typography>
      </div>
    </div>
  );
}
