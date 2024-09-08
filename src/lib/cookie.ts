import { cookies } from "next/headers";

const themeCookieName = "tinyard-theme";
export type ThemeValue = "light" | "dark" | "system";

export const setThemeCookie = (theme: ThemeValue) => {
  cookies().set(themeCookieName, theme);
};
export const getThemeCookie = () => {
  const value = cookies().get(themeCookieName)?.value;
  if (!value) return "system";
  return value as ThemeValue;
};
