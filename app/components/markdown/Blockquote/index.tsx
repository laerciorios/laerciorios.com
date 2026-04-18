import styles from "./styles.module.css";

interface BlockquoteProps {
  children?: React.ReactNode;
}

export default function Blockquote({ children }: BlockquoteProps) {
  return <blockquote className={styles.blockquote}>{children}</blockquote>;
}
