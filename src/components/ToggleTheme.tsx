"use client";
import { useTheme } from "next-themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { match } from "ts-pattern";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import "./ToggleTheme.scss";

type Theme = "light" | "dark";
const getSystemTheme = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDark ? "dark" : "light";
};

const ToggleTheme = () => {
  const [localTheme, setLocalTheme] = useState<Theme | null>(null);
  const { setTheme, theme } = useTheme();
  const getThemeIcon = (theme: Theme | null) => {
    if (!theme) return null;
    return match(theme)
      .with("dark", () => <MoonIcon />)
      .with("light", () => <SunIcon />)
      .otherwise(() => null);
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label="Theme options" className="DropdownTrigger ">
          {getThemeIcon(localTheme)}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => setTheme("light")}>
            Light
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => setTheme("dark")}>
            Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => setTheme(getSystemTheme())}>
            System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ToggleTheme;
