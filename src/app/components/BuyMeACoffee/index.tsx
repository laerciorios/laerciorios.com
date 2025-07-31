import { useTranslation } from "react-i18next";

import CoffeeSvg from "../../assets/icons/coffee.svg";
import { BUY_ME_A_COFFEE_LINK } from "../../utils/contrants";
import Typography from "../Typography";
import styles from "./styles.module.css";

export default function BuyMeACoffee() {
  const { t } = useTranslation();

  return (
    <a
      className={styles["buy_me_a_coffee-wrapper"]}
      href={BUY_ME_A_COFFEE_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Buy me a coffee"
    >
      <Typography variant="h4">{t("components.buyMeACoffee.label")}</Typography>
      <CoffeeSvg className={styles["buy_me_a_coffee-icon"]} />
    </a>
  );
}
