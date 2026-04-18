import { getTranslations } from "next-intl/server";
import Typography from "@/app/components/Typography";
import Badge from "@/app/components/Badge";
import {
  Link,
  Github,
  Figma,
  Briefcase,
  User,
  GraduationCap,
  Geodatin,
  Golfarma,
  UEFS,
  Unifacs,
  Senai,
} from "@/app/components/icons";
import type { Project } from "@/data/projects";
import ImageCarousel from "./ImageCarousel";
import styles from "./styles.module.css";

const bondIcons: Record<string, React.ReactNode> = {
  Geodatin: <Geodatin className="brandIconFill" />,
  Golfarma: <Golfarma className="brandIconFill" />,
  UEFS: <UEFS className="brandIconFill" />,
  Unifacs: <Unifacs className="brandIconFill" />,
  Senai: <Senai className="brandIconFill" />,
};

const typeIcons: Record<string, React.ReactNode> = {
  personal: <User className="brandIconStroke" />,
  professional: <Briefcase className="brandIconStroke" />,
  academic: <GraduationCap className="brandIconStroke" />,
};

interface ProjectCardProps {
  project: Project;
  locale: string;
}

export default async function ProjectCard({ project, locale }: ProjectCardProps) {
  const t = await getTranslations({ locale, namespace: "projects" });
  const slug = project.title as string;

  return (
    <article className={styles.card}>
      <ImageCarousel images={project.images} projectTitle={project.title} />

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <Typography variant="h3" as="h2" className={styles.textLeft}>
            {t(`${slug}.title.label`)}
          </Typography>
          <Typography variant="caption2" as="span" className={styles.year}>
            {project.year}
          </Typography>
        </div>

        <div className={styles.meta}>
          <span className={styles.typeRow}>
            {typeIcons[project.type]}
            <Typography variant="caption2" as="span" className={styles.brandText}>
              {t(`types.${project.type}.label`)}
            </Typography>
          </span>
          {project.bond && (
            <span className={styles.bondRow}>
              {bondIcons[project.bond] ?? <Briefcase className="brandIconStroke" />}
              <Typography variant="caption2" as="span" className={styles.brandText}>
                {project.bond}
              </Typography>
            </span>
          )}
        </div>

        <Typography variant="body2" className={styles.textLeft}>
          {t(`${slug}.description.label`)}
        </Typography>

        <div className={styles.skills}>
          {project.skills.map((skill) => (
            <Badge key={skill} label={skill} className={styles.badgeBg} />
          ))}
        </div>

        <div className={styles.links}>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
              <Link />
              PAGE
            </a>
          )}
          {project.repository && (
            <a href={project.repository} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
              <Github />
              GITHUB
            </a>
          )}
          {project.design && (
            <a href={project.design} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
              <Figma />
              FIGMA
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
