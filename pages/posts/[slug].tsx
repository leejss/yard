import PostBody from "components/post/PostBody";
import PostTitle from "components/post/PostTitle";
import { PostType } from "interfaces/post";
import { getAllPostStories, getSinglePost } from "lib/api";

interface Props {
  post: PostType;
}

export default function PostPage({ post }: Props) {
  console.log(post);

  return (
    <div className="flex flex-col gap-4">
      <header className="border-b-2 pb-4 border-green-400">
        <PostTitle title={post.title} />
        {/* <PostDate date={post.published_at} /> */}
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

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};
