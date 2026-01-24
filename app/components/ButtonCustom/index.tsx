import styles from "./styles.module.css";

interface ButtonCustomProps {
  icon: React.ReactNode;
  onClick: () => void;
  'aria-label'?: string;
}

export default function ButtonCustom({ icon, onClick, 'aria-label': ariaLabel }: ButtonCustomProps) {
  return (
    <button 
      className={styles["button-custom"]} 
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}
