import Image from "next/image";
import styles from "./styles.module.css";

interface ArticleImageProps {
  src?: string;
  alt?: string;
}

export default function ArticleImage({ src = "", alt = "" }: ArticleImageProps) {
  const resolvedSrc = src.startsWith("http") ? src : `/images/blog/${src}`;

  return (
    <span className={styles.wrapper}>
      <Image
        src={resolvedSrc}
        alt={alt}
        width={800}
        height={450}
        className={styles.image}
      />
    </span>
  );
}
