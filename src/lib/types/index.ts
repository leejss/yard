export type Post = {
  id: string;
  title: string;
  date: string;
  slug: string;
  categories?: TagType[];
  html?: string;
};

export type FrontMatter = {
  title: string;
  date: Date | string;
  categories: string[];
};

export type TagType =
  | "css"
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  | "storybook"
  | "git"
  | "etc";
