"use server";

import { ThemeValue, setThemeCookie } from "./cookie";

export async function changeTheme(formData: FormData) {
  const themeValue = formData.get("theme") as ThemeValue;
  console.log("themeValue", themeValue);
  setThemeCookie(themeValue);
}
