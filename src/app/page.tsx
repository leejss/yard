import Link from "next/link";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";

function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link href={post.url} className="text-blue-700 hover:text-blue-900 dark:text-blue-400">
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <div className="text-sm [&>*:last-child]:mb-0 [&>*]:mb-3" dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </div>
  );
}

function PostTitle({ post }: { post: Post }) {
  const { title, url } = post;
  return (
    <Link href={url} className="group">
      <article className="flex flex-col">
        <h2 className="text-paprika-800 group-hover:text-paprika-500 py-3 text-lg transition">{post.title}</h2>
      </article>
    </Link>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  return (
    <div className="mx-auto w-full max-w-[--page-width] py-8">
      {posts.map((post, idx) => (
        <PostTitle key={idx} post={post} />
      ))}
    </div>
  );
}
