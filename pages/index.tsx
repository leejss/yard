import PostList from "components/PostList";
import { PostType } from "interfaces/post";
import { getAllPosts } from "lib/api";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

interface Props {
  posts: PostType[];
}

export default function HomePage({ posts }: Props) {
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
  const posts = await getAllPosts(["publishedAt", "tags"]);
  return {
    props: {
      posts,
    },
  };
}
