import { Post } from "@/types";
import parseMarkdown from "@/utils/parseMarkdown";
import dayjs from "dayjs";

interface PostProps {
  post: Post;
}
const Post = async ({ post }: PostProps) => {
  const html = await parseMarkdown(post.content);
  return (
    <article>
      <header className="py-4">
        <h1 className="text-xl">{post.title}</h1>
        <h2>{dayjs(post.date).format("YYYY/MM/DD")}</h2>
      </header>
      <div
        className="prose dark:prose-invert !text-foreground"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </article>
  );
};

export default Post;
