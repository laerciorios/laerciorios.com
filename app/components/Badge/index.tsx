import styles from "./styles.module.css";
import Typography from "@/app/components/Typography";

interface BadgeProps {
  label: string;
  className?: string;
}

export default function Badge({ label, className = "" }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${className}`}>
      <Typography variant="caption1" as="span" className={styles.label}>
        {label}
      </Typography>
    </span>
  );
}
