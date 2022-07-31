import { getAllPosts, getPostBySlug } from "@lib/api";
import { PostType } from "@interfaces/post";

interface Props {
  post: PostType;
}

export default function PostPage({ post }: Props) {
  return (
    <div>
      <h1>{post.title}</h1>
      <h1>{post.date}</h1>
    </div>
  );
}

interface PageParams {
  params: {
    slug: string;
  };
}
export async function getStaticProps({ params }: PageParams) {
  const post = await getPostBySlug(`${params.slug}.md`, [
    "content",
    "date",
    "title",
  ]);
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts(["slug"]);
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}
