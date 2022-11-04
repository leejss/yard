import fs from "fs";
import matter from "gray-matter";
import markdownToHtml from "@lib/markdownToHtml";
import { Post } from "@lib/types";
import path from "path";
import { getFileTimeInfo, isDir } from "src/utils/fs-helper";

const POST_DIR = path.join(process.cwd(), "posts");

export function getFullPath(str: string) {
  return path.join(POST_DIR, str);
}

export function getAllSlugs() {
  const result = fs.readdirSync(POST_DIR);
  return result.map((r) => {
    return r.split(".")[0];
  });
}

export async function getPostBySlug(slug: string, fields?: ("categories" | "html")[]) {
  let fullPath = getFullPath(slug);
  if (isDir(fullPath)) {
    fullPath = path.join(fullPath, `${slug}.md`);
  } else {
    fullPath = `${fullPath}.md`;
  }

  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);

  const post: Post = {
    id: `${Math.round(getFileTimeInfo(fullPath).createAtMs)}`,
    title: data.title,
    date: data.date ? data.date.toLocaleString() : getDate(),
    slug,
  };
  if (fields) {
    for (const f of fields) {
      if (f === "categories") {
        post[f] = data.categories;
      }
      if (f === "html") {
        post[f] = await markdownToHtml(content);
      }
    }
  }

  return post;
}

export async function getAllPosts() {
  const slugs = getAllSlugs();
  const result = await Promise.all(slugs.map((s) => getPostBySlug(s)));
  return result.sort((a, b) => {
    return new Date(a.date) > new Date(b.date) ? -1 : 1;
  });
}

function getDate() {
  function addLeadingZeros(num: number, totalLength: number = 2) {
    return String(num).padStart(totalLength, "0");
  }

  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();

  return `${y}-${m}-${addLeadingZeros(d)} ${addLeadingZeros(hh)}:${mm}`;
}

export async function getPrevAndNext(slug: string) {
  let prev: null | { title: string; slug: string } = null;
  let next: null | { title: string; slug: string } = null;
  const posts = await getAllPosts();
  const currentSlugIdx = posts.findIndex((post) => post.slug === slug);

  if (currentSlugIdx === 0) {
    next = {
      slug: posts[currentSlugIdx + 1].slug,
      title: posts[currentSlugIdx + 1].title,
    };
  } else if (currentSlugIdx === posts.length - 1) {
    prev = {
      title: posts[currentSlugIdx - 1].title,
      slug: posts[currentSlugIdx - 1].slug,
    };
  } else {
    next = {
      slug: posts[currentSlugIdx + 1].slug,
      title: posts[currentSlugIdx + 1].title,
    };
    prev = {
      title: posts[currentSlugIdx - 1].title,
      slug: posts[currentSlugIdx - 1].slug,
    };
  }

  return {
    prev,
    next,
  };
}
