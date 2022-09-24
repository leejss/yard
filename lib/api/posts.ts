import fs from "fs";
import path from "path";
import { isDir, isMarkdown } from "utils/fs-helper";
import matter from "gray-matter";
import { Post } from "lib/types";
import markdownToHtml from "lib/markdownToHtml";
import { foramtDate } from "utils/format-helpter";

const POST_DIR = path.join(process.cwd(), "posts");

export function getFullPath(str: string) {
  return path.join(POST_DIR, str);
}

export function getPostPaths() {
  const result: string[] = [];
  const d1 = fs.readdirSync(POST_DIR);
  d1.forEach((ditem) => {
    const fp = path.join(POST_DIR, ditem);

    if (isDir(fp)) {
      const d2 = fs.readdirSync(fp);

      d2.forEach((d2item) => {
        if (isMarkdown(path.join(POST_DIR, ditem, d2item))) {
          result.push(`${ditem}/${d2item}`);
        }
      });
    } else if (isMarkdown(fp)) {
      result.push(ditem);
    }
  });
  return result;
}

export function getAllSlugs() {
  const result = fs.readdirSync(POST_DIR);
  return result.map((r) => {
    return r.split(".")[0];
  });
}

export async function getPostBySlug(slug: string) {
  let fullPath = getFullPath(slug);
  if (isDir(fullPath)) {
    fullPath = path.join(fullPath, `${slug}.md`);
  } else {
    fullPath = `${fullPath}.md`;
  }

  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);
  const post: Post = {
    title: data.title,
    categories: data.categories,
    date: foramtDate(data.date),
    html: await markdownToHtml(content),
  };

  return post;
}

export async function getPostByPath(p: string) {
  const fullPath = getFullPath(p);

  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);
  const post: Post = {
    title: data.title,
    categories: data.categories,
    date: data.date,
    html: await markdownToHtml(content),
  };

  return post;
}

// fs.readdirSync
// fs.readFileSync
export function getAllPost() {
  const result = fs.readdirSync(POST_DIR);
  result.forEach((f) => {
    console.log(f, isDir(path.join(POST_DIR, f)));
  });

  return fs.readdirSync(POST_DIR);
}
