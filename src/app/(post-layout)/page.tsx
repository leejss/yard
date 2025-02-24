import Link from "next/link";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";

function PostTitle({ post }: { post: Post }) {
  const { title, url } = post;
  return (
    <Link href={url} className="group">
      <article className="flex flex-col">
        <h2 className="py-3 text-lg text-stone-900 transition group-hover:text-stone-600 group-hover:underline dark:text-stone-300 dark:group-hover:text-stone-100">
          {title}
        </h2>
        <time
          dateTime={post.date}
          className="text-sm text-gray-700 transition group-hover:text-gray-500 dark:text-gray-400 group-hover:dark:text-gray-200"
        >
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
      </article>
    </Link>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  return (
    <div className="mx-auto w-full max-w-[--page-width] px-4 py-8">
      <ul className="flex flex-col gap-4">
        {posts.map((post, idx) => (
          <li key={idx}>
            <PostTitle post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
