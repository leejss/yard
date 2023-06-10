import * as fs from "fs";
import matter from "gray-matter";

export default async function getPosts() {
  const files = fs.readdirSync("_posts");
  const postData = files
    .map((file) => {
      const content = fs.readFileSync(`_posts/${file}`, "utf8");
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
}
