import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localizedUrl, ogLocale } from "@/i18n/utils";
import Typography from "@/app/components/Typography";
import { Link as LinkIcon, Github, Figma } from "@/app/components/icons";
import { setupCategories } from "@/data/setup";
import styles from "./styles.module.css";

interface SetupPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: SetupPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("setupTitle.label"),
    description: t("setupDescription.label"),
    alternates: {
      canonical: localizedUrl(locale, "/setup"),
      languages: {
        "x-default": "https://laerciorios.com/setup",
        en: "https://laerciorios.com/setup",
        "pt-BR": "https://laerciorios.com/pt-BR/setup",
      },
    },
    openGraph: {
      url: localizedUrl(locale, "/setup"),
      title: `${t("setupTitle.label")} — Laercio Rios`,
      description: t("setupDescription.label"),
      locale: ogLocale(locale),
    },
  };
}

function Icon(props: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {props.children}
    </svg>
  );
}

// Items with a photo placeholder (hardware); everything else gets a logo tile.
const photoItems = new Set([
  "notebook",
  "monitor",
  "keyboard",
  "mouse",
  "headset",
]);

const itemIcons: Record<string, React.ReactNode> = {
  notebook: (
    <Icon>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M2 20h20" />
    </Icon>
  ),
  monitor: (
    <Icon>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </Icon>
  ),
  keyboard: (
    <Icon>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
    </Icon>
  ),
  mouse: (
    <Icon>
      <rect x="6" y="3" width="12" height="18" rx="6" />
      <path d="M12 7v4" />
    </Icon>
  ),
  headset: (
    <Icon>
      <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
      <rect x="3" y="14" width="4" height="6" rx="2" />
      <rect x="17" y="14" width="4" height="6" rx="2" />
    </Icon>
  ),
  editor: (
    <Icon>
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </Icon>
  ),
  font: (
    <Icon>
      <path d="M4 7V5h16v2M9 20h6M12 5v15" />
    </Icon>
  ),
  terminal: (
    <Icon>
      <path d="m4 17 6-6-6-6M12 19h8" />
    </Icon>
  ),
  shell: (
    <Icon>
      <path d="M6.5 12c1.5-3.5 4.7-5.5 8-5.5 3.2 0 5.6 2.2 7 5.5-1.4 3.3-3.8 5.5-7 5.5-3.3 0-6.5-2-8-5.5Z" />
      <path d="M2.5 8.5 6.5 12l-4 3.5c-.5-2.3-.5-4.7 0-7Z" />
      <path d="M16.5 10.5h.01" />
    </Icon>
  ),
  browser: (
    <Icon>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Icon>
  ),
  design: <Figma />,
  notes: (
    <Icon>
      <path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
      <path d="M15 3v6h6" />
    </Icon>
  ),
  apiClient: (
    <Icon>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </Icon>
  ),
  claudeCode: (
    <Icon>
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
    </Icon>
  ),
  aiExtras: (
    <Icon>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7L19 15z" />
    </Icon>
  ),
  hosting: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 4.5 21.5 20h-19L12 4.5Z" />
    </svg>
  ),
  git: <Github />,
  domain: (
    <Icon>
      <rect x="2" y="3" width="20" height="7" rx="2" />
      <rect x="2" y="14" width="20" height="7" rx="2" />
      <path d="M6 6.5h.01M6 17.5h.01" />
    </Icon>
  ),
};

export default async function Setup({ params }: SetupPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "setup" });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="h1" className={styles.pageTitle}>
          {t("title.label")}
        </Typography>
        <Typography variant="body2" className={styles.subtitle}>
          {t("subtitle.label")}
        </Typography>
      </div>

      <Typography variant="body3" className={styles.wip}>
        {t("wip.label")}
      </Typography>

      {setupCategories.map((category) => (
        <section key={category.key} className={styles.section}>
          <Typography variant="h3" as="h2" className={styles.sectionTitle}>
            {t(`categories.${category.key}.label`)}
          </Typography>
          <div className={styles.grid}>
            {category.items.map((item) => (
              <article key={item.key} className={styles.card}>
                <div className={styles.media}>
                  {photoItems.has(item.key) ? (
                    <div className={styles.photoPlaceholder}>
                      {itemIcons[item.key]}
                      <Typography
                        variant="caption2"
                        as="span"
                        className={styles.photoCaption}
                      >
                        {t("imagePlaceholder.label")}
                      </Typography>
                    </div>
                  ) : (
                    <div className={styles.logoTile}>
                      {itemIcons[item.key]}
                    </div>
                  )}
                </div>
                <div className={styles.body}>
                  <Typography
                    variant="body1"
                    as="h3"
                    className={styles.itemName}
                  >
                    {t(`items.${item.key}.name.label`)}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={styles.itemDescription}
                  >
                    {t(`items.${item.key}.description.label`)}
                  </Typography>
                  {item.links && item.links.length > 0 && (
                    <div className={styles.links}>
                      {item.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.itemLink}
                        >
                          <LinkIcon />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
