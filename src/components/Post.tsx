import { PostModel } from "@/lib/services/post-service";
import { foramtDate } from "@/lib/utils";

import "./Post.scss";

interface PostProps {
  post: PostModel;
}
const Post = async ({ post }: PostProps) => {
  return (
    <article className="post w-full pb-12">
      <header className="py-4">
        <h1 className="text-xl font-bold text-foreground md:text-3xl">{post.title}</h1>
        <time>{foramtDate(post.date)}</time>
      </header>
      <div
        className="prose font-mono text-foreground"
        dangerouslySetInnerHTML={{
          __html: post.html,
        }}
      />
    </article>
  );
};

export default Post;
