import PostBody from "@components/post/PostBody";
import PostDate from "@components/post/PostDate";
import PostTitle from "@components/post/PostTitle";
import { getAllPosts, getSinglePost } from "@lib/ghost-api";
import type { PostOrPage } from "@tryghost/content-api";

interface Props {
  post: PostOrPage;
}

export default function PostPage({ post }: Props) {
  console.log(post);

  return (
    <div className="flex flex-col gap-4">
      <header className="border-b-2 pb-4 border-green-400">
        <PostTitle title={post.title} />
        <PostDate date={post.published_at} />
      </header>
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
  const post = await getSinglePost(params.slug);

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
