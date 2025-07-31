import { useTranslation } from "react-i18next";

import Typography from "../Typography";
import styles from "./styles.module.css";

interface FormationCardProps {
  title: string;
  type: "bachelor" | "technician";
  institution: string;
  startYear: string;
  endYear?: string;
  isLocked?: boolean;
}

export default function FormationCard({
  title,
  type,
  institution,
  startYear,
  endYear,
  isLocked,
}: FormationCardProps) {
  const { t } = useTranslation();

  return (
    <li className={styles["formation"]}>
      <div className={styles["formation-title"]}>
        <Typography variant="body1">
          {t(`data.formations.${title}.label`)}
        </Typography>
        <Typography variant="body2">
          {`${t(`data.formations.types.${type}.label`)}${isLocked ? " - " + t("data.formations.types.locked.label") : ""}`}
        </Typography>
      </div>
      <Typography variant="body3">{institution}</Typography>
      <Typography variant="caption2">{`${startYear} - ${endYear}`}</Typography>
    </li>
  );
}
