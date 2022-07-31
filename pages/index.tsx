import HomeTitleSection from "@components/home-title";
import PostList from "@components/post-list";
import { PostType } from "@interfaces/post";
import { getAllPosts } from "lib/api";

interface Props {
  posts: PostType[];
}

export default function HomePage({ posts }: Props) {
  return (
    <div>
      <HomeTitleSection />
      <PostList posts={posts} />
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts(["date", "slug", "title"]);
  return {
    props: {
      posts,
    },
  };
}
