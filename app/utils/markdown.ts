import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const parseMarkdown = async (raw: string) => {
  const html = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeShiki, {
      // or `theme` for a single theme
      // themes: {
      //   light: "vitesse-light",
      //   dark: "vitesse-dark",
      // },
      theme: "houston",
    })
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(raw);

  return String(html);
};
