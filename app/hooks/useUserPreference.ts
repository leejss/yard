import { useRouteLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { RootLoader } from "~/root";
// import type { RootLoaderData } from "~/root";

export type UserPreference = {
  theme: "light" | "dark";
};
export function useUserPreference(): UserPreference {
  const data = useRouteLoaderData<RootLoader>("root");

  invariant(
    data?.userPreference,
    "No user preference data found. Did you forget to load it in the root loader?",
  );

  return data.userPreference as UserPreference;
}
