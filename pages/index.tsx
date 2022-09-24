import PostList from "components/PostList";
import { getAllPosts } from "lib/api/posts";
import { Post } from "lib/types";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

interface HomePageProps {
  posts: Post[];
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <>
      <PostList posts={posts} />
      <div className="fixed text-base md:text-3xl flex items-center gap-4 bottom-4 right-4 bg-[#fffdb] dark:bg-[#1b1616db] rounded-2xl p-2">
        <Link href="/about">About</Link>
        <MdArrowForwardIos />
      </div>
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
