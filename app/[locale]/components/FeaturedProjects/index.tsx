import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "@/app/components/icons";
import Typography from "@/app/components/Typography";
import { projects } from "@/data/projects";
import FeaturedProjectCard from "./FeaturedProjectCard";
import styles from "./styles.module.css";

export default async function FeaturedProjects() {
  const t = await getTranslations("projects");
  const tHome = await getTranslations("home");

  const highlighted = projects.filter((p) => p.highlight);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Typography variant="h2" as="h2" className={styles.title}>
          {tHome("featuredProjectsTitle.label")}
        </Typography>
        <Link href="/projects" className={styles.seeAll}>
          <Typography variant="body1" as="span" className={styles.seeAllLabel}>
            {tHome("seeAllProjects.label")}
          </Typography>
          <ArrowRight className={styles.seeAllIcon} aria-hidden />
        </Link>
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
