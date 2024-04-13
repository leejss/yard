import { VRITE_TOKEN } from "@/constant";
import { Article } from "@/lib/model/Article";
import { createClient } from "@vrite/sdk";
import * as fs from "fs";
import matter from "gray-matter";
import { join } from "path";

export const vrite = createClient({
  token: VRITE_TOKEN,
});

export const createFsClient = ({
  path = "/public/_posts",
}: {
  path: string;
}) => {
  const base = process.cwd() + path;
  const getPostBySlug = async (slug: string): Promise<Article> => {
    const filename = slug + ".md";
    const file = fs.readFileSync(`${base}/${filename}`, "utf8");
    const { data, content } = matter(file);

    return new Article({
      content,
      title: data.title,
      date: data.date,
      tags: data.categories,
    });
  };

  const getPosts = async () => {
    const files = fs.readdirSync(base);
    const postData = files
      .filter((file) => {
        const filePath = join(base, file);
        const fileStat = fs.statSync(filePath);
        if (fileStat.isDirectory()) return false;
        return true;
      })
      .map((file) => {
        const content = fs.readFileSync(`${base}/${file}`, "utf8");
        const parsedMarkdown = matter(content);
        const title = parsedMarkdown.data.title;
        const date = new Date(parsedMarkdown.data.date);

        return {
          slug: file.split(".")[0],
          title,
          date,
        };
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    return postData;
  };

  return {
    getPostBySlug,
    getPosts,
  };
};
