import { PostType } from "interfaces/post";
import { isEmpty } from "utils/array-helper";
import { foramtDate } from "utils/format-helpter";
import Link from "next/link";

interface PostListProps {
  posts: PostType[];
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
  post: PostType;
}

function PostListItem({ post }: PostListItemProps) {
  // console.log(post.tags);

  return (
    <Link href={`/posts/${post.slug}`}>
      <li className="flex justify-between text-2xl md:text-3xl leading-4 hover:text-green-400 cursor-pointer">
        <span>{post.title}</span>
        {post.publishedAt && (
          <time className="text-base">{foramtDate(post.publishedAt)}</time>
        )}
      </li>
    </Link>
  );
}
