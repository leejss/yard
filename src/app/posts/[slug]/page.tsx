import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  return (
    <article className="mx-auto flex max-w-[--page-width] flex-col items-stretch px-4 py-8">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-sm text-gray-700 dark:text-gray-400">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-300">{post.title}</h1>
      </div>
      <div
        className="prose prose-stone min-w-full flex-1 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      />
    </article>
  );
};

export default PostLayout;
