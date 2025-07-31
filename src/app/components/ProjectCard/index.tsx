import Image from "next/image";
import { useTranslation } from "react-i18next";

import GithubIcon from "../../assets/icons/github-logo.svg";
import LinkIcon from "../../assets/icons/link.svg";
import Typography from "../Typography";
import styles from "./styles.module.css";

interface ProjectCardProps {
  title: string;
  image: string;
  link?: string;
  github?: string;
}

export default function ProjectCard({
  title,
  image,
  link,
  github,
}: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <li className={styles["project"]}>
      <Image
        src={`/images/projects/${title}/${image}`}
        alt={title}
        width={800}
        height={400}
      />
      <div className={styles["project-content"]}>
        <Typography variant="h4">
          {t(`data.projects.${title}.title.label`)}
        </Typography>
        <Typography variant="body2">
          {t(`data.projects.${title}.description.label`)}
        </Typography>
        <ul>
          {link && (
            <li>
              <a href={link} target="_blank" rel="noreferrer">
                <LinkIcon />
              </a>
            </li>
          )}
          {github && (
            <li>
              <a href={github} target="_blank" rel="noreferrer">
                <GithubIcon />
              </a>
            </li>
          )}
        </ul>
      </div>
    </li>
  );
}
