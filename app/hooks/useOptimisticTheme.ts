import { useFetcher } from "@remix-run/react";
import { FETCH_SELECT_THEME_KEY } from "~/components/select-theme";

// It listens the form data from the fetcher and returns the theme value
export function useOptimisticTheme() {
  const themeFetcher = useFetcher({ key: FETCH_SELECT_THEME_KEY });

  if (themeFetcher.formData) {
    return themeFetcher.formData.get("theme");
  }
  return null;
}
