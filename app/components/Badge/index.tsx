import styles from "./styles.module.css";
import Typography from "@/app/components/Typography";

interface BadgeProps {
  label: string;
}

export default function Badge({ label }: BadgeProps) {
  return (
    <span className={styles.badge}>
      <Typography variant="caption1" as="span" className={styles.label}>
        {label}
      </Typography>
    </span>
  );
}
