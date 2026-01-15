import styles from "./styles.module.css";

interface ButtonCustomProps {
  icon: React.ReactNode;
  onClick: () => void;
}

export default function ButtonCustom({ icon, onClick }: ButtonCustomProps) {
  return (
    <button className={styles["button-custom"]} onClick={onClick}>
      {icon}
    </button>
  );
}
