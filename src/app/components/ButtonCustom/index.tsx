import styles from "./styles.module.css";

interface ButtonCustomProps {
  icon: React.ReactNode;
  onClick: () => void;
}

export default function ButtonCustom({ icon, onClick }: ButtonCustomProps) {
  return (
    <button className={styles["global-button"]} onClick={onClick}>
      {icon}
    </button>
  );
}
