import { useTheme } from "next-themes";

import DarkModeSvg from "../../assets/icons/dark-mode.svg";
import LightModeSvg from "../../assets/icons/light-mode.svg";
import ButtonCustom from "../ButtonCustom";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const icon = theme === "light" ? <DarkModeSvg /> : <LightModeSvg />;

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return <ButtonCustom icon={icon} onClick={toggleTheme} />;
}
