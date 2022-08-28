export const PAGE_TITLE = "tinyyard";

export const __DEV__ = process.env.NODE_ENV === "development";

export const API_TOKEN = __DEV__
  ? process.env.BLOK_PREVIEW_TOKEN
  : process.env.BLOK_PUBLIC_TOKEN;
