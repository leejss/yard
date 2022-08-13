import PostList from "@components/post-list";
import { getAllPosts } from "@lib/ghost-api";
import type { PostsOrPages } from "@tryghost/content-api";

interface Props {
  posts: PostsOrPages;
}

export default function HomePage({ posts }: Props) {
  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts(["id", "slug", "published_at", "title"]);
  return {
    props: {
      posts,
    },
  };
}
