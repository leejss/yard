import { useUserPreference } from "~/hooks/useUserPreference";

export function useTheme() {
	const userPrefs = useUserPreference();
	return userPrefs.theme;
}
