import { foramtDate } from "@/lib/utils";
import type { PostListItemModel } from "@/lib/services/post-service";
import Link from "next/link";
import { postIdCache } from "@/lib/caching";

interface PostsProps {
  posts: PostListItemModel[];
}

export const Posts = ({ posts }: PostsProps) => {
  return (
    <ul className="flex flex-col gap-2 text-lg text-foreground">
      {posts.map(({ date, id, slug, title }) => {
        const pathname = "/posts/" + slug;
        return (
          <li key={id} className="text-foreground transition-colors hover:text-brand-light">
            <Link
              className="block w-full font-semibold md:text-xl lg:text-2xl"
              href={{
                pathname,
              }}
            >
              {title}
            </Link>
            <span className="text-sm text-gray-500">{date}</span>
          </li>
        );
      })}
    </ul>
  );
};
