import { getTranslations } from "next-intl/server";
import { formations } from "@/data/formations";
import FormationCard from "./FormationCard";
import styles from "./styles.module.css";

interface FormationsProps {
  locale: string;
}

export default async function Formations({ locale }: FormationsProps) {
  const t = await getTranslations({ locale, namespace: "formations" });

  return (
    <div className={styles.list}>
      {formations.map((formation, index) => {
        const status = t(`status.${formation.status}.label`);

        return (
          <FormationCard
            key={formation.title}
            institutionKey={formation.title}
            title={t(`${formation.title}.label`)}
            type={t(`types.${formation.type}.label`)}
            institution={formation.institution}
            startYear={formation.startYear}
            endYear={formation.endYear}
            status={
              formation.statusDetail
                ? t("statusWithDetail.label", {
                    status,
                    detail: t(`statusDetails.${formation.statusDetail}.label`),
                  })
                : status
            }
            description={t(`${formation.title}.description.label`)}
            isLast={index === formations.length - 1}
          />
        );
      })}
    </div>
  );
}
