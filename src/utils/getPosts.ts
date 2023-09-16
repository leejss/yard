import * as fs from "fs";
import matter from "gray-matter";
import path from "path";

export default async function getPosts() {
  const folderPath = path.join(process.cwd(), "/public/_posts");
  const files = fs.readdirSync(folderPath);
  const postData = files
    .filter((file) => {
      const filePath = path.join(folderPath, file);
      const fileStat = fs.statSync(filePath);
      if (fileStat.isDirectory()) return false;
      return true;
    })
    .map((file) => {
      const content = fs.readFileSync(`${folderPath}/${file}`, "utf8");
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
