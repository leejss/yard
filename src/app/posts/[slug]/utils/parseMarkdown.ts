import { remark } from "remark";
import html from "remark-html";

export default async function parseMarkdown(raw: string) {
  // const html = await unified()
  //   .use(remarkParse) // Convert into markdown AST
  //   .use(remarkRehype) // Transform to HTML AST
  //   .use(rehypeSanitize) // Sanitize HTML input
  //   .use(rehypeStringify) // Convert AST into serialized HTML
  //   .process(raw);
  // return String(html);
  const content = await remark().use(html).process(raw);
  return content.toString();
}
