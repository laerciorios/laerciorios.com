import styles from "./styles.module.css";

interface ArticleTableProps {
  children?: React.ReactNode;
}

export default function ArticleTable({ children }: ArticleTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>{children}</table>
    </div>
  );
}
