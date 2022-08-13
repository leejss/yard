import PostBody from "@components/post/post-body";
import PostDate from "@components/post/post-date";
import PostTitle from "@components/post/post-title";
import { getAllPosts, getSinglePost } from "@lib/ghost-api";
import type { PostOrPage } from "@tryghost/content-api";

interface Props {
  post: PostOrPage;
}

export default function PostPage({ post }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <PostTitle title={post.title} />
      <PostDate date={post.published_at} />
      <PostBody html={post.html} />
    </div>
  );
}

interface PageParams {
  params: {
    slug: string;
  };
}
export async function getStaticProps({ params }: PageParams) {
  const post = await getSinglePost(params.slug, [
    "title",
    "published_at",
    "html",
  ]);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPosts();
  return {
    paths: allPosts.map((post) => `/posts/${post.slug}`),
    fallback: false,
  };
}
