"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Geodatin, Golfarma } from "@/app/components/icons";
import Typography from "@/app/components/Typography";
import Badge from "@/app/components/Badge";
import styles from "./styles.module.css";

type StackCategory = "backend" | "frontend" | "devops" | "tools";

interface ExperienceCardProps {
  companyKey: string;
  company: string;
  dateRange: string;
  position: string;
  location: string;
  description: string;
  about: string;
  responsibilities: string;
  stack: Partial<Record<StackCategory, string[]>>;
  isLast: boolean;
  seeMoreLabel: string;
  seeLessLabel: string;
  aboutLabel: string;
  responsibilitiesLabel: string;
  stackLabel: string;
}

const companyIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  geodatin: Geodatin,
  golfarma: Golfarma,
};

const stackOrder: StackCategory[] = ["backend", "frontend", "devops", "tools"];
const stackCategoryLabel: Record<StackCategory, string> = {
  backend: "BACKEND",
  frontend: "FRONTEND",
  devops: "DEVOPS",
  tools: "TOOLS",
};

function parseResponsibilities(text: string) {
  return text.split("\n").filter(Boolean).map((line) => ({
    bullet: line.startsWith("- "),
    content: line.startsWith("- ") ? line.slice(2) : line,
  }));
}

export default function ExperienceCard({
  companyKey,
  company,
  dateRange,
  position,
  location,
  description,
  about,
  responsibilities,
  stack,
  isLast,
  seeMoreLabel,
  seeLessLabel,
  aboutLabel,
  responsibilitiesLabel,
  stackLabel,
}: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = companyIcons[companyKey];
  const parsed = parseResponsibilities(responsibilities);
  const stackEntries = stackOrder.filter((cat) => stack[cat]?.length);

  return (
    <div className={styles.row}>
      <div className={styles.timeline}>
        <div className={styles.dot}>
          {Icon && <Icon className={styles.icon} />}
        </div>
        {!isLast && <div className={styles.line} />}
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.headerRow}>
            <Typography variant="h4" as="h3" className={styles.role}>
              {position}
            </Typography>
            <Typography variant="caption1" className={styles.dateRange}>
              {dateRange}
            </Typography>
          </div>
          <div className={styles.subheaderRow}>
            <Typography variant="body1" className={styles.company}>
              {company}
            </Typography>
            <Typography variant="body3" className={styles.location}>
              {location}
            </Typography>
          </div>
        </div>

        <Typography variant="body2" className={styles.description}>
          {description}
        </Typography>

        <button
          className={styles.toggle}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <Typography variant="caption1" className={styles.toggleLabel}>
            {expanded ? seeLessLabel : seeMoreLabel}
          </Typography>
          {expanded ? (
            <ChevronUp className={styles.chevron} />
          ) : (
            <ChevronDown className={styles.chevron} />
          )}
        </button>

        {expanded && (
          <div className={styles.expandedContent}>
            <div className={styles.section}>
              <Typography variant="body1" className={styles.sectionTitle}>
                {aboutLabel}
              </Typography>
              <Typography variant="body2" className={styles.sectionText}>
                {about}
              </Typography>
            </div>

            <div className={styles.section}>
              <Typography variant="body1" className={styles.sectionTitle}>
                {responsibilitiesLabel}
              </Typography>
              <div className={styles.responsibilitiesList}>
                {parsed.map((item, i) =>
                  item.bullet ? (
                    <div key={i} className={styles.bulletItem}>
                      <span className={styles.bullet}>•</span>
                      <Typography variant="body2" className={styles.sectionText}>
                        {item.content}
                      </Typography>
                    </div>
                  ) : (
                    <Typography key={i} variant="body2" className={styles.sectionText}>
                      {item.content}
                    </Typography>
                  )
                )}
              </div>
            </div>

            {stackEntries.length > 0 && (
              <div className={styles.section}>
                <Typography variant="body1" className={styles.sectionTitle}>
                  {stackLabel}
                </Typography>
                <div className={styles.stackGrid}>
                  {stackEntries.map((cat) => (
                    <div key={cat} className={styles.stackCategory}>
                      <Typography variant="body3" className={styles.stackCategoryLabel}>
                        {stackCategoryLabel[cat]}
                      </Typography>
                      <div className={styles.badges}>
                        {stack[cat]!.map((tech) => (
                          <Badge key={tech} label={tech} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
