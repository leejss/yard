export interface Post {
  title: string;
  date: Date | string;
  categories: string[];
  html: string;
}

export type FrontMatter = {
  title: string;
  date: Date | string;
  categories: string[];
};
