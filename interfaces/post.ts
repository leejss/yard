export type TagType =
  | "css"
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  | "storybook";

export interface PostType {
  id: string;
  slug: string;
  title: string;
  html?: string;
  createdAt?: string;
  publishedAt?: string | null;
  tags?: TagType[];
}
