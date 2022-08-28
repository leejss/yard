import type { PostType } from "@interfaces/post";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";
import markdownToHtml from "../markdownToHtml";

type PostField = keyof PostType;
const POSTS_DIR = join(process.cwd(), "_posts");

export function getPostSlugs(): string[] {
  return readdirSync(POSTS_DIR);
}

export async function getPostBySlug(filename: string, fields: PostField[]) {
  const slug = filename.replace(/\.md$/, "");
  const filePath = join(POSTS_DIR, filename);

  const fileContent = readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const html = await markdownToHtml(content);
  const result: any = {};
  fields.forEach((field) => {
    if (field === "slug") {
      result[field] = slug;
    }
    if (field === "date") {
      result[field] = data.date;
    }
    if (field === "title") {
      result[field] = data.title;
    }
    if (field === "content") {
      result[field] = html;
    }
  });

  return result;
}

export async function getAllPosts(fields: PostField[]) {
  const slugs = getPostSlugs();
  return await Promise.all(
    slugs.map((slug) => {
      return getPostBySlug(slug, fields);
    })
  );
}
