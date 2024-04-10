import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

type DateCompatible = string | number | Date;
export function formatDate(date: DateCompatible) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  return `${year}/${month}/${day}`;
}

export function sortByTime(a: Date, b: Date, order: "dsec" | "asc" = "dsec") {
  if (order === "dsec") {
    return b.getTime() - a.getTime();
  }
  return a.getTime() - b.getTime();
}
