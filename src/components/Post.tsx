import { PostModel } from "@/lib/services/post-service";
import { foramtDate } from "@/lib/utils";

import "./Post.scss";

interface PostProps {
  post: PostModel;
}
const Post = async ({ post }: PostProps) => {
  return (
    <article className="post pb-12 w-full">
      <header className="py-4">
        <h1 className="text-xl md:text-3xl font-bold text-foreground">
          {post.title}
        </h1>
        <time>{foramtDate(post.date)}</time>
      </header>
      <div
        className="prose text-foreground font-mono"
        dangerouslySetInnerHTML={{
          __html: post.html,
        }}
      />
    </article>
  );
};

export default Post;
