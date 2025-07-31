"use client";
import "./i18n";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import ArrowDownIcon from "./assets/icons/arrow-down.svg";
import ArrowRight from "./assets/icons/arrow-right-alt.svg";
import BlueskyIcon from "./assets/icons/bluesky-logo.svg";
import EmailIcon from "./assets/icons/email-logo.svg";
import GithubIcon from "./assets/icons/github-logo.svg";
import ItchioIcon from "./assets/icons/itchio-logo.svg";
import LinkedinIcon from "./assets/icons/linkedin-logo.svg";
import Logo from "./assets/logo.svg";
import profileImg from "./assets/profile.png";
import ExperienceCard from "./components/ExperienceCard";
import Footer from "./components/Footer";
import FormationCard from "./components/FormationCard";
import Header from "./components/Header";
import PresentationCard from "./components/PresentationCard";
import ProjectCard from "./components/ProjectCard";
import Typography from "./components/Typography";
import { experiences } from "./data/experiences";
import { formations } from "./data/formations";
import { presentations } from "./data/presentations";
import { projects } from "./data/projects";
import styles from "./page.module.css";
import {
  GITHUB_LINK,
  EMAIL_LINK,
  LINKEDIN_LINK,
  ITCHIO_LINK,
  BLUESKY_LINK,
} from "./utils/contrants";
// import cvPtPdf from "../../public/cv/pt.pdf";

export default function Home() {
  const { t } = useTranslation();

  const projectsHighlighted = projects.filter((project) => project.highlight);
  const [experiencesWithActive, setExperiencesWithActive] = useState(
    experiences.map((experience, index) => ({
      ...experience,
      active: index === 0,
    })),
  );

  const activeExperienceSummary = useMemo(() => {
    const activeExperience = experiencesWithActive.find(
      (experience) => experience.active,
    );
    return activeExperience
      ? t(`data.experiences.${activeExperience.title}.description.label`)
      : t("pages.home.experience.hasNotSummary.label");
  }, [experiencesWithActive, t]);

  function handleActiveExperienceChange(title: string) {
    const updatedExperiences = experiencesWithActive.map((experience) => ({
      ...experience,
      active: experience.title === title && !experience.active,
    }));
    setExperiencesWithActive(updatedExperiences);
  }

  return (
    <main className={styles.home}>
      <Header />
      <section className={styles["home-intro_section"]}>
        <div className={styles["home-intro_section-wrapper"]}>
          <Logo className={styles["home-intro_section-logo"]} />
          <div className={styles["home-intro_section-title"]}>
            <Typography variant="h1">Laercio Rios</Typography>
            <Typography variant="h2">{t("profile.position")}</Typography>
          </div>
          <ul className={styles["home-intro_section-networks"]}>
            <li>
              <a href={EMAIL_LINK} target="_blank" rel="noreferrer">
                <EmailIcon />
              </a>
            </li>
            <li>
              <a href={LINKEDIN_LINK} target="_blank" rel="noreferrer">
                <LinkedinIcon />
              </a>
            </li>
            <li>
              <a href={GITHUB_LINK} target="_blank" rel="noreferrer">
                <GithubIcon />
              </a>
            </li>
            <li>
              <a href={ITCHIO_LINK} target="_blank" rel="noreferrer">
                <ItchioIcon />
              </a>
            </li>
            <li>
              <a href={BLUESKY_LINK} target="_blank" rel="noreferrer">
                <BlueskyIcon />
              </a>
            </li>
          </ul>
          <ArrowDownIcon className={styles["home-intro_section-arrow_down"]} />
        </div>
      </section>
      <section className={styles["home-about"]}>
        <div className={styles["home-about-wrapper"]}>
          <div>
            <Typography variant="h2">
              {t("pages.home.about.introduction.label")}
            </Typography>
            <Typography variant="h4">
              {t("pages.home.about.content.label")}
            </Typography>
          </div>
          <Image src={profileImg} alt="Profile photo" />
          <Typography variant="body1">
            &quot;{t("pages.home.about.description.label")}&quot;
          </Typography>
        </div>
      </section>
      <section className={styles["home-section"]}>
        <div className={styles["home-section-wrapper"]}>
          <div className={styles["home-section-title"]}>
            <Typography variant="h3">
              {t("pages.home.projects.title.label")}
            </Typography>
            <Link href="/projects">
              <Typography variant="body1">
                {t("pages.home.projects.seeMore.label")}
              </Typography>
              <ArrowRight />
            </Link>
          </div>
          <ul className={styles["projects-list"]}>
            {projectsHighlighted.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                image={project.images[0]}
                link={project.link}
                github={project.repository}
              />
            ))}
          </ul>
        </div>
      </section>
      <section className={styles["home-section"]}>
        <div className={styles["home-section-wrapper"]}>
          <div className={styles["home-section-title"]}>
            <Typography variant="h3">
              {t("pages.home.experience.title.label")}
            </Typography>
            <a
              href={t("pages.home.experience.pdfResume.label")}
              target="_blank"
              rel="noreferrer"
            >
              <Typography variant="body1">
                {t("pages.home.experience.seeMore.label")}
              </Typography>
              <ArrowRight />
            </a>
          </div>
          <ul className={styles["experience-nested_list"]}>
            {experiencesWithActive.map((experience) => (
              <li key={experience.title}>
                <ExperienceCard
                  title={experience.title}
                  company={experience.company}
                  startDate={experience.startDate}
                  endDate={experience.endDate}
                  active={experience.active}
                  hasOpenIcon
                  onClick={() => handleActiveExperienceChange(experience.title)}
                />
                {experience.active && (
                  <Typography variant="body2">
                    {t(
                      `data.experiences.${experience.title}.description.label`,
                    )}
                  </Typography>
                )}
              </li>
            ))}
          </ul>
          <div className={styles["experience-content"]}>
            <div className={styles["experience-summary"]}>
              <Typography variant="h4">
                {t("pages.home.experience.summary.label")}
              </Typography>
              <Typography variant="body2">{activeExperienceSummary}</Typography>
            </div>
            <ul className={styles["experience-list"]}>
              {experiencesWithActive.map((experience) => (
                <ExperienceCard
                  key={experience.title}
                  title={experience.title}
                  company={experience.company}
                  startDate={experience.startDate}
                  endDate={experience.endDate}
                  active={experience.active}
                  onClick={() => handleActiveExperienceChange(experience.title)}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className={styles["home-section"]}>
        <div className={styles["home-section-wrapper"]}>
          <div className={styles["home-section-title"]}>
            <Typography variant="h3">
              {t("pages.home.formation.title.label")}
            </Typography>
          </div>
          <ul className={styles["formation-list"]}>
            {formations.map((formation) => (
              <FormationCard
                key={formation.title}
                title={formation.title}
                type={formation.type}
                institution={formation.institution}
                startYear={formation.startYear}
                endYear={formation.endYear}
                isLocked={formation.isLocked}
              />
            ))}
          </ul>
        </div>
      </section>
      <section className={styles["home-section"]}>
        <div className={styles["home-section-wrapper"]}>
          <div className={styles["home-section-title"]}>
            <Typography variant="h3">
              {t("pages.home.presentations.title.label")}
            </Typography>
          </div>
          <ul className={styles["home-presentations-list"]}>
            {presentations.map((presentation) => (
              <li key={presentation.title}>
                <PresentationCard
                  title={presentation.title}
                  link={presentation.link}
                  date={presentation.date}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}
