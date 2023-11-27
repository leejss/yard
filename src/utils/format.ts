import dayjs from "dayjs";

export const foramtDate = (date: string | undefined) => {
  if (!date) return "unknown";
  const PATTERN = "YYYY/MM/DD";
  return dayjs(date).format(PATTERN);
};
