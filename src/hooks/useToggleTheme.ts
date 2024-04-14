import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

const getSystemTheme = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDark ? "dark" : "light";
};

export const useToggleTheme = () => {
  const [localTheme, setLocalTheme] = useState<Theme | null>(null);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      const systemTheme = getSystemTheme();
      localStorage.setItem("theme", systemTheme);
      setLocalTheme(systemTheme);
    } else {
      setLocalTheme(theme as Theme);
    }
  }, [theme]);

  const toggleTheme = useCallback(
    (theme: string) => {
      setTheme(theme);
    },
    [setTheme],
  );

  return {
    toggleTheme,
  };
};
