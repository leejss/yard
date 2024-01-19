import { PostListItem } from "@/lib/model/PostListItem";
import { foramtDate } from "@/lib/utils";
import Link from "next/link";

interface PostsProps {
  posts: PostListItem[];
}

export const Posts = ({ posts }: PostsProps) => {
  return (
    <ul className="text-lg text-foreground flex flex-col gap-2">
      {posts.map((post, index) => {
        return (
          <li key={index} className="transition-colors text-foreground hover:text-brand-light">
            <Link
              href={{
                pathname: "/posts/" + post.slug,
              }}
              className="block w-full font-medium"
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
