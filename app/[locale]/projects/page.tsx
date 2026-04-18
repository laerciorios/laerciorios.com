import { getTranslations } from "next-intl/server";
import Typography from "@/app/components/Typography";
import { projects } from "@/data/projects";
import ProjectCard from "./components/ProjectCard";
import styles from "./styles.module.css";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function Projects({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <div className={styles.page}>
      <Typography variant="h1">{t("title")}</Typography>
      <div className={styles.list}>
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} locale={locale} />
        ))}
      </div>
    </div>
  );
}
