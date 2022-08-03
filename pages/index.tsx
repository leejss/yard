import PostList from "@components/post-list";
import { PostType } from "@interfaces/post";
import { getAllPosts } from "@lib/ghost-api";

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
  // const posts = await getAllPosts(["date", "slug", "title"]);
  // return {
  //   props: {
  //     posts,
  //   },
  // };

  const posts = await getAllPosts();
  console.log({ posts });

  return {
    props: {
      posts,
    },
  };
}
