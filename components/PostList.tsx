import { isEmpty } from "utils/array-helper";
import Link from "next/link";
import { Post } from "lib/types";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  if (isEmpty(posts)) return null;

  return (
    <ul className="flex flex-col gap-3 my-6">
      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

interface PostListItemProps {
  post: Post;
}

function PostListItem({ post }: PostListItemProps) {
  return (
    <li className="py-2 transition-all border-b border-b-gray-300 dark:border-b-gray-700">
      <div className="flex flex-col justify-between mb-1 md:flex-row">
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-lg cursor-pointer md:text-2xl hover:text-gray-500">
            {post.title ?? "No title"}
          </h2>
        </Link>
        {post.date ? (
          <time className="text-sm text-gray-500 md:text-base">
            {post.date}
          </time>
        ) : (
          <time className="text-base">dev</time>
        )}
      </div>
    </li>
  );
}
