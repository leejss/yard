import { themeCookie } from "~/utils/theme-cookie";

export async function getThemeFromRequest(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const theme = (await themeCookie.parse(cookieHeader)) || "light";
  return theme as "dark" | "light";
}
