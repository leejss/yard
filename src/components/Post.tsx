import { CodeBlock } from "@/components/CodeBlock";
import type { Article } from "@/lib/model/Article";
import { foramtDate } from "@/utils/format";
import parseMarkdown from "@/utils/parseMarkdown";

interface PostProps {
  post: Article;
}
const Post = async ({ post }: PostProps) => {
  const html = await parseMarkdown(post.content);

  return (
    <article className="pb-12">
      <header className="py-4">
        <h1 className="text-xl">{post.title}</h1>
        <h2>{foramtDate(post.date)}</h2>
      </header>
      <CodeBlock>
        <div
          className="prose dark:prose-invert !text-foreground font-mono"
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </CodeBlock>
    </article>
  );
};

export default Post;
