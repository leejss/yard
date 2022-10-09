import StyledMarkdown from "components/StyledMarkdown";
import Tag from "components/ui/Tag";
import { getAllSlugs, getPostBySlug, getPrevAndNext } from "lib/api/posts";
import { Post } from "lib/types";
import Head from "next/head";
import Link from "next/link";

interface Props {
  post: Post;
  prev: null | { title: string; slug: string };
  next: null | { title: string; slug: string };
}

export default function PostPage({ post, prev, next }: Props) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-2 pb-4 border-b-[0.5px] border-gray-300">
          <h1 className="text-3xl md:leading-[60px!important] md:text-5xl dark:text-white">
            {post.title}
          </h1>
          {post.date ? <p className="text-2xl">{post.date}</p> : <div>DEV</div>}
          <div>
            {post.categories &&
              post.categories.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </header>
        {post.html && <StyledMarkdown html={post.html} />}
      </div>
      <nav className="mt-4 relative">
        {prev && (
          <div className="absolute left-0 cursor-pointer py-2 px-3 bg-gray-600 hover:bg-gray-700 rounded-md">
            <Link href={`/posts/${prev.slug}`}>
              <span>이전글: {prev.title}</span>
            </Link>
          </div>
        )}
        {next && (
          <div className="absolute right-0 cursor-pointer py-2 px-3 bg-gray-600 hover:bg-gray-700 rounded-md">
            <Link href={`/posts/${next.slug}`}>
              <span>다음글: {next.title}</span>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

interface PathContext {
  params: {
    slug: string;
  };
}

export const getStaticProps = async (context: PathContext) => {
  const slug = context.params.slug;
  const post = await getPostBySlug(slug, ["categories", "html"]);

  const { next, prev } = await getPrevAndNext(slug);

  return {
    props: {
      post,
      prev,
      next,
    },
  };
};

export const getStaticPaths = async () => {
  const slugs = getAllSlugs();
  const paths = slugs.map((slug) => {
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
