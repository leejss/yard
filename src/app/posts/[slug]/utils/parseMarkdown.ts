import { remark } from "remark";
import html from "remark-html";

export default async function parseMarkdown(raw: string) {
  const content = await remark().use(html).process(raw);
  return content.toString();
}
