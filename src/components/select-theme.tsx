"use client";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon, FaceIcon } from "@radix-ui/react-icons";
import { match } from "ts-pattern";

type Theme = "light" | "dark";

const getSystemTheme = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDark ? "dark" : "light";
};

const SelectTheme = () => {
  const { setTheme, themes, theme } = useTheme();
  const [localTheme, setLocalTheme] = useState<Theme | null>(null);
  const [open, setOpen] = useState(false);

  const getThemeIcon = (theme: Theme | null) => {
    if (!theme) return <FaceIcon />;
    return match(theme)
      .with("dark", () => <MoonIcon />)
      .with("light", () => <SunIcon />)
      .otherwise(() => <FaceIcon />);
  };

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

  return (
    <div className="relative z-10 h-full">
      {/* Dropdown trigger */}
      <button
        onClick={() => {
          setOpen((v) => !v);
        }}
      >
        {getThemeIcon(localTheme)}
      </button>
      {/* Dropdown content */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 15 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <div className="">
              {
                // Loop through themes
                themes.map((theme) => (
                  <button
                    key={theme}
                    className="capitalize"
                    onClick={() => {
                      setTheme(theme);
                      setOpen(false);
                    }}
                  >
                    {theme}
                  </button>
                ))
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectTheme;
