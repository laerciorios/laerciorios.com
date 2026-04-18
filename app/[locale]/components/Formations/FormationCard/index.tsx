import { Unifacs, UEFS, Senai } from "@/app/components/icons";
import Typography from "@/app/components/Typography";
import styles from "./styles.module.css";

interface FormationCardProps {
  institutionKey: string;
  title: string;
  type: string;
  institution: string;
  startYear: string;
  endYear?: string;
  status: string;
  description: string;
  isLast: boolean;
}

const institutionIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  cc: Unifacs,
  ecomp: UEFS,
  systemDevelopment: Senai,
};

export default function FormationCard({
  institutionKey,
  title,
  type,
  institution,
  startYear,
  endYear,
  status,
  description,
  isLast,
}: FormationCardProps) {
  const Icon = institutionIcons[institutionKey];
  const years = endYear ? `${startYear} - ${endYear}` : startYear;

  return (
    <div className={styles.row}>
      <div className={styles.timeline}>
        <div className={styles.dot}>
          {Icon && <Icon className={styles.logo} />}
        </div>
        {!isLast && <div className={styles.line} />}
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <Typography variant="h4" as="h3" className={styles.title}>
              {title}
            </Typography>
            <div className={styles.metaRight}>
              <Typography variant="caption1" className={styles.years}>
                {years}
              </Typography>
              <Typography variant="caption2" className={styles.status}>
                ({status})
              </Typography>
            </div>
          </div>

          <Typography variant="body1" className={styles.type}>
            {type}
          </Typography>

          <Typography variant="body1" className={styles.institution}>
            {institution}
          </Typography>
        </div>

        <Typography variant="body2" className={styles.description}>
          {description}
        </Typography>
      </div>
    </div>
  );
}
