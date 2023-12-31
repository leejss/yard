import { PostListItem } from "@/lib/model/PostListItem";
import { foramtDate } from "@/utils/format";
import Link from "next/link";

interface PostsProps {
  posts: PostListItem[];
}

export const Posts = ({ posts }: PostsProps) => {
  return (
    <ul className="text-lg text-foreground flex flex-col gap-2">
      {posts.map((post, index) => {
        return (
          <li key={index} className="outline-emerald-500 rounded-md hover:text-emerald-700 dark:hover:text-emerald-500 text-foreground">
            <Link
              href={{
                pathname: "/posts/" + post.slug,
              }}
              className="transition-[color] block w-full"
            >
              {post.title}
            </Link>
            <span className="text-sm text-gray-500">{foramtDate(post.date)}</span>
          </li>
        );
      })}
    </ul>
  );
};
