import { useRecoilState } from "recoil";
import { themeAtom } from "../recoil/themeAtom";
import { useEffect } from "react";

export default function useTheme() {
  const [theme, setTheme] = useRecoilState(themeAtom);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}
