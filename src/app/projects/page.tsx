"use client";
import "../i18n";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import ArrowLeft from "../assets/icons/arrow-left.svg";
import ArrowRight from "../assets/icons/arrow-right.svg";
import GithubIcon from "../assets/icons/github-logo.svg";
import LinkIcon from "../assets/icons/link.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Typography from "../components/Typography";
import { projects } from "../data/projects";
import styles from "./page.module.css";

export default function Projects() {
  const { t } = useTranslation();
  const [imageCurrent, setImageCurrent] = useState<Map<string, number>>(
    new Map(
      projects
        .filter((project) => project.images.length > 0)
        .map((project) => [project.title, 0] as [string, number]),
    ),
  );

  function handleImageLoad(key: string, isIncrement: boolean) {
    const totalImages =
      projects.find((project) => project.title === key)?.images.length || 0;
    setImageCurrent((prev) => {
      const currentIndex = prev.get(key) || 0;
      let newIndex = currentIndex;
      if (isIncrement) {
        newIndex += 1;
        if (newIndex >= totalImages) {
          newIndex = 0;
        }
      } else {
        newIndex -= 1;
        if (newIndex < 0) {
          newIndex = totalImages - 1;
        }
      }
      return new Map(prev).set(key, newIndex);
    });
  }

  return (
    <main className={styles.projects}>
      <Header hasBackButton />
      <section className={styles["projects-main"]}>
        <Typography variant="h1">{t("pages.projects.title.label")}</Typography>
        <ul className={styles["projects-list"]}>
          {projects.map((project) => (
            <li key={project.title} className={styles["projects-list-item"]}>
              {imageCurrent.has(project.title) && (
                <div className={styles["projects-list-item-imageContainer"]}>
                  {project.images.length > 1 && (
                    <button
                      className={
                        styles["projects-list-item-imageContainer-btn"]
                      }
                      onClick={() => handleImageLoad(project.title, false)}
                    >
                      <ArrowLeft />
                    </button>
                  )}
                  <Image
                    src={`/images/projects/${project.title}/${project.images[imageCurrent.get(project.title) || 0]}`}
                    alt={project.title}
                    width={800}
                    height={400}
                  />
                  {project.images.length > 1 && (
                    <button
                      className={
                        styles["projects-list-item-imageContainer-btn"]
                      }
                      onClick={() => handleImageLoad(project.title, true)}
                    >
                      <ArrowRight />
                    </button>
                  )}
                </div>
              )}
              <div className={styles["projects-list-item-content"]}>
                <Typography variant="h2">
                  {t(`data.projects.${project.title}.title.label`)}
                </Typography>
                <Typography variant="body1">
                  {`${t(`data.projects.types.${project.type}.label`)}${project.bond ? ` - ${project.bond}` : ""}`}
                </Typography>
                <Typography variant="h4">{project.year}</Typography>
                <Typography variant="body2">
                  {t(`data.projects.${project.title}.description.label`)}
                </Typography>
                <ul className={styles["projects-list-item-skills_list"]}>
                  {project.skills.map((skill) => (
                    <li key={skill}>
                      <Typography variant="body1">{skill}</Typography>
                    </li>
                  ))}
                </ul>
                <div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className={styles["projects-list-item-link"]}
                    >
                      <LinkIcon />
                    </a>
                  )}
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                      className={styles["projects-list-item-link"]}
                    >
                      <GithubIcon />
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </main>
  );
}
