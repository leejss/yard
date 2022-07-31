import type { PostType } from "@interfaces/post";
import { isEmpty } from "@utils/array-helper";
import Link from "next/link";

interface PostListProps {
  posts: PostType[];
}

export default function PostList({ posts }: PostListProps) {
  if (isEmpty(posts)) return null;
  return (
    <ul>
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
  return (
    <li>
      <Link href={`/posts/${post.slug}`}>{post.title}</Link>
    </li>
  );
}
