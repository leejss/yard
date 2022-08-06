import formatISO from "date-fns/formatISO";
import ko from "date-fns/locale/ko";

export function foramtDate(date?: string) {
  if (!date) return "unknown";
  return formatISO(new Date(date), {
    representation: "date",
  });
}
