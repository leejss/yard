"use client";

import { ThemeValue, setThemeCookie } from "@/lib/cookie";

interface ThemeDropdownProps {
  currentTheme: ThemeValue;
}

export default function ThemeDropdown({ currentTheme }: ThemeDropdownProps) {
  return (
    <div>
      <button
        onClick={async () => {
          setThemeCookie("light");
        }}
      >
        change to light
      </button>
      <button>change to dark</button>
    </div>
  );
}
