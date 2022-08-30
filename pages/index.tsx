import PostList from "components/PostList";
import { PostType } from "interfaces/post";
import { getAllPosts } from "lib/api";

interface Props {
  posts: PostType[];
}

export default function HomePage({ posts }: Props) {
  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts(["publishedAt", "tags"]);
  return {
    props: {
      posts,
    },
  };
}
