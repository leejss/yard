import { foramtDate } from "@/lib/utils";
import type { PostListItemModel } from "@/lib/services/post-service";
import Link from "next/link";

interface PostsProps {
  posts: PostListItemModel[];
}

export const Posts = ({ posts }: PostsProps) => {
  return (
    <ul className="flex flex-col gap-2 text-lg text-foreground">
      {posts.map((post, index) => {
        return (
          <li key={index} className="text-foreground transition-colors hover:text-brand-light">
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
