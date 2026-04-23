import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localizedUrl } from "@/i18n/utils";
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
      canonical: localizedUrl(locale, "/projects"),
      languages: {
        "x-default": "https://laerciorios.com/projects",
        en: "https://laerciorios.com/projects",
        "pt-BR": "https://laerciorios.com/pt-BR/projects",
      },
    },
    openGraph: {
      url: localizedUrl(locale, "/projects"),
      title: "Projects — Laercio Rios",
    },
  };
}

export default async function Projects({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <div className={styles.page}>
      <Typography variant="h1" className={styles.pageTitle}>{t("title.label")}</Typography>
      <div className={styles.list}>
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} locale={locale} />
        ))}
      </div>
    </div>
  );
}
