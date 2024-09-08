"use client";

import { ThemeValue } from "@/lib/cookie";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

// const getSystemTheme = () => {
//   const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//   return isDark ? "dark" : "light";
// };

const dropdownOffset = 20;
const SelectTheme = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setTheme, themes, resolvedTheme } = useTheme();
  // const [localTheme, setLocalTheme] = useState<Theme | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const buttonElement = buttonRef.current;
    const dropdownElement = dropdownRef.current;
    if (!buttonElement) return;
    const buttonRect = buttonElement.getBoundingClientRect();
    const buttonBottom = buttonRect.bottom;
    if (open && dropdownElement) {
      dropdownElement.style.top = `${buttonBottom + dropdownOffset}px`;
    }
  }, [open]);

  const labels: Record<ThemeValue, string> = {
    light: "Light",
    dark: "Dark",
    system: "System",
  };

  const theme = (resolvedTheme || "system") as ThemeValue;
  return (
    <div className="relative z-10 flex h-full w-[60px] flex-1 flex-col justify-center">
      {/* Dropdown trigger */}
      <button
        className="ink text-left"
        ref={buttonRef}
        onClick={() => {
          setOpen((v) => !v);
        }}
      >
        {labels[theme]}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dropdownRef}
            className="absolute"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 15 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <div className="">
              {themes.map((theme) => (
                <button
                  key={theme}
                  className="ink capitalize"
                  onClick={() => {
                    setTheme(theme);
                    setOpen(false);
                  }}
                >
                  {theme}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectTheme;
