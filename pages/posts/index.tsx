import PostList from "components/PostList";
import { getAllPosts } from "lib/api/posts";
import { Post } from "lib/types";
import Head from "next/head";

interface HomePageProps {
  posts: Post[];
}

export default function PostsPage({ posts }: HomePageProps) {
  return (
    <>
      <Head>
        <title>tinyyard | posts</title>
      </Head>
      <PostList posts={posts} />
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts: posts as Post[],
    },
  };
}
