import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Typography from "@/app/components/Typography";
import { projects } from "@/data/projects";
import ProjectCard from "./components/ProjectCard";
import styles from "./styles.module.css";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Projects",
    description: "Full portfolio of projects by Laercio Rios — personal, professional and academic work.",
    alternates: {
      canonical: `https://laerciorios.com/${locale}/projects`,
      languages: {
        en: "https://laerciorios.com/en/projects",
        "pt-BR": "https://laerciorios.com/pt-BR/projects",
      },
    },
    openGraph: {
      url: `https://laerciorios.com/${locale}/projects`,
      title: "Projects — Laercio Rios",
    },
  };
}

export default async function Projects({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <div className={styles.page}>
      <Typography variant="h1" className={styles.pageTitle}>{t("title")}</Typography>
      <div className={styles.list}>
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} locale={locale} />
        ))}
      </div>
    </div>
  );
}
