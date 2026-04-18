import NextLink from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight } from "@/app/components/icons";
import Typography from "@/app/components/Typography";
import { projects } from "@/data/projects";
import FeaturedProjectCard from "./FeaturedProjectCard";
import styles from "./styles.module.css";

export default async function FeaturedProjects() {
  const t = await getTranslations("projects");
  const tHome = await getTranslations("home");
  const locale = await getLocale();

  const highlighted = projects.filter((p) => p.highlight);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Typography variant="h2" as="h2" className={styles.title}>
          {tHome("featuredProjectsTitle")}
        </Typography>
        <NextLink href={`/${locale}/projects`} className={styles.seeAll}>
          <Typography variant="body1" as="span" className={styles.seeAllLabel}>
            {tHome("seeAllProjects")}
          </Typography>
          <ArrowRight className={styles.seeAllIcon} aria-hidden />
        </NextLink>
      </div>

      <div className={styles.grid}>
        {highlighted.map((project) => {
          const image =
            project.images.length > 0
              ? `/images/projects/${project.title}/${project.images[0]}`
              : undefined;

          return (
            <FeaturedProjectCard
              key={project.title}
              title={t(`${project.title}.title.label`)}
              description={t(`${project.title}.description.label`)}
              year={project.year}
              image={image}
              link={project.link}
              repository={project.repository}
            />
          );
        })}
      </div>
    </div>
  );
}
