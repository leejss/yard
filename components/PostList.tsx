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
    <Link href={`/posts/${post.slug}`}>
      <li className="py-3 border-b border-b-gray-300">
        <div className="flex justify-between mb-1">
          <h2 className="text-2xl leading-4 cursor-pointer md:text-3xl hover:text-green-400">
            {post.title}
          </h2>
          {post.publishedAt ? (
            <time className="text-xl">{foramtDate(post.publishedAt)}</time>
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
    </Link>
  );
}
