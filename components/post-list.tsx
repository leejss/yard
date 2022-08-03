import type { PostType } from "@interfaces/post";
import { isEmpty } from "@utils/array-helper";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface PostListProps {
  posts: PostType[];
}

export default function PostList({ posts }: PostListProps) {
  if (isEmpty(posts)) return null;
  return (
    <ul className="my-6">
      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

interface PostListItemProps {
  post: PostType;
}

function PostListItem({ post }: PostListItemProps) {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`/posts/${post.slug}`);
  }, [post, router]);
  return (
    <li
      className="flex justify-between text-2xl md:text-3xl leading-4 dark:hover:text-green-400"
      onClick={handleClick}
    >
      <span>{post.title}</span>
      <time className="text-base">{post.date}</time>
    </li>
  );
}
