import formatISO from "date-fns/formatISO";

export function foramtDate(date?: string) {
  if (!date) return "unknown";
  return formatISO(new Date(date), {
    representation: "date",
  });
}
