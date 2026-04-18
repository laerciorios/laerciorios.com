import Typography from "@/app/components/Typography";
import ScrollChevron from "./ScrollChevron";
import styles from "./styles.module.css";

interface HeroProps {
  name: string;
  jobTitle: string;
}

export default function Hero({ name, jobTitle }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.center}>
        <img src="/logo.svg" alt="Laercio Rios logo" className={styles.logo} />
        <Typography variant="h1" className={styles.name}>
          {name}
        </Typography>
        <Typography variant="h2" className={styles.jobTitle}>
          {jobTitle}
        </Typography>
      </div>
      <ScrollChevron />
    </section>
  );
}
