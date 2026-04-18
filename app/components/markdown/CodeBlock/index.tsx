import styles from "./styles.module.css";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const language = className?.replace("language-", "");

  return (
    <div className={styles.wrapper}>
      {language && <span className={styles.language}>{language}</span>}
      <pre className={styles.pre}>
        <code>{children}</code>
      </pre>
    </div>
  );
}
