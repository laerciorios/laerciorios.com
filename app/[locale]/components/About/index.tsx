import Image from "next/image";
import styles from "./styles.module.css";

function H(props: { children: React.ReactNode }) {
  return <span className={styles.highlight}>{props.children}</span>;
}

export default function About() {
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
        I&apos;m <H>Laercio Rios</H>, I&apos;m a FullStack developer focused on{" "}
        <H>JavaScript/TypeScript</H>, with experience in <H>Node.js</H> and{" "}
        <H>React.js</H>. I have experience creating Restful APIs with clear and
        detailed documentation integrated with relational databases like{" "}
        <H>PostgreSQL</H>. I also have experience developing responsive
        interfaces and implementing efficient development and deployment
        pipelines (<H>CI/CD</H>) using <H>Docker</H> and <H>GitHub Actions</H>.
        In addition, I have experience creating unit and integration tests,
        ensuring the quality and robustness of the applications.
      </p>
    </section>
  );
}
