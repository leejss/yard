import { changeTheme } from "@/lib/actions";
import { ThemeValue, getThemeCookie } from "@/lib/cookie";
import ThemeDropdown from "./ThemeDropdown";

export default function ChangeTheme() {
  // 1. Dropdown of themes
  // 2. handletheme function
  const value = getThemeCookie();
  const label: Record<ThemeValue, string> = {
    dark: "DARK",
    light: "LIGHT",
    system: "SYSTEM",
  };

  const text = label[value];
  // TOOD: Pass current theme and set handler to client component
  return (
    <div>
      {text}
      <form action={changeTheme}>
        <input type="checkbox" value="light" name="theme" />
        <input type="checkbox" value="dark" name="theme" />
        <input type="checkbox" value="system" name="theme" />
        <button type="submit">change</button>
      </form>
    </div>
  );
}
