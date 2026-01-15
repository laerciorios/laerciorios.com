import Link from "next/link";
import styles from "./styles.module.css";
import Typography from "@/app/components/Typography";

interface HeaderItemProps {
  text: string;
  href: string;
}

export default function HeaderItem({ text, href }: HeaderItemProps) {
  return (
    <Link href={href} className={styles.headerItem}>
      <Typography variant="body2">{text}</Typography>
    </Link>
  );
}
