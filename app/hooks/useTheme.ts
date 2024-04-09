import { useOptimisticTheme } from "~/hooks/useOptimisticTheme";
import { useUserPreference } from "~/hooks/useUserPreference";

export function useTheme() {
  const userPrefs = useUserPreference();
  const optimisticTheme = useOptimisticTheme();
  return optimisticTheme ?? userPrefs.theme;
}
