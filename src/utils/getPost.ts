import { Post } from "@/types";
import * as fs from "fs";
import matter from "gray-matter";
import path from "path";

export default async function getPost(slug: string): Promise<Post> {
  const filename = slug + ".md";
  const folderPath = path.join(process.cwd(), "/public/_posts");
  const file = fs.readFileSync(`${folderPath}/${filename}`, "utf8");
  const { data, content } = matter(file);

  return {
    title: data.title,
    date: new Date(data.date),
    categories: data.categories,
    content,
  };
}
