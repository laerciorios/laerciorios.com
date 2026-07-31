import Image from "next/image";
import { getTranslations } from "next-intl/server";
import styles from "./styles.module.css";

function H(props: { children: React.ReactNode }) {
  return <span className={styles.highlight}>{props.children}</span>;
}

interface AboutProps {
  locale: string;
}

export default async function About({ locale }: AboutProps) {
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <section className={styles.about}>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/profile.png"
          alt="Laercio Rios"
          width={240}
          height={300}
          className={styles.photo}
        />
      </div>
      <p className={styles.bio}>
        {t.rich("bio.label", { h: (chunks) => <H>{chunks}</H> })}
      </p>
    </section>
  );
}
