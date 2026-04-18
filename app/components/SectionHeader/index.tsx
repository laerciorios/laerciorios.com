import Typography from "@/app/components/Typography";
import styles from "./styles.module.css";

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <Typography variant="h2" as="h2" className={styles.header}>
      {title}
    </Typography>
  );
}
