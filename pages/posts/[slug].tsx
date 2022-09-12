import PostBody from "components/post/PostBody";
import Tag from "components/ui/Tag";
import { PostType } from "interfaces/post";
import { getAllPostStories, getSinglePost } from "lib/api";
import { foramtDate } from "utils/format-helpter";

interface Props {
  post: PostType;
}

export default function PostPage({ post }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-2 pb-4 border-b-[0.5px] border-gray-300">
        <h1 className="text-3xl md:leading-[60px!important] md:text-5xl dark:text-white">
          {post.title}
        </h1>
        {post.publishedAt ? (
          <p className="text-2xl">{foramtDate(post.publishedAt)}</p>
        ) : (
          <div>DEV</div>
        )}
        <div>{post.tags && post.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      </header>
      <PostBody html={post.html} />
    </div>
  );
}

interface PathContext {
  params: {
    slug: string;
  };
}

export const getStaticProps = async (context: PathContext) => {
  const post = await getSinglePost(context.params.slug, [
    "html",
    "createdAt",
    "publishedAt",
    "tags",
  ]);
  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths = async () => {
  const postStories = await getAllPostStories();
  const paths = postStories.map((story) => {
    return {
      params: {
        slug: story.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
