import { PostType } from "interfaces/post";
import { isEmpty } from "utils/array-helper";
import { foramtDate } from "utils/format-helpter";
import Link from "next/link";
import Tag from "./ui/Tag";

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
  return (
    <li className="py-3 border-b-[0.5px] border-b-gray-300">
      <div className="flex flex-col justify-between mb-1 md:flex-row">
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-xl cursor-pointer md:text-3xl hover:text-gray-500">
            {post.title ?? "No title"}
          </h2>
        </Link>
        {post.publishedAt ? (
          <time className="text-base md:text-lg">
            {foramtDate(post.publishedAt)}
          </time>
        ) : (
          <time className="text-base">dev</time>
        )}
      </div>
      {post.tags && (
        <div>
          {post.tags.map((t) => (
            <Tag key={`${post.id}-${t}`}>{t}</Tag>
          ))}
        </div>
      )}
    </li>
  );
}
