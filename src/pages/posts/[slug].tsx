import Giscus from "@giscus/react";
import StyledMarkdown from "@components/StyledMarkdown";
import NavButton from "@components/ui/NavButton";
import Tag from "@components/ui/Tag";
import { getAllSlugs, getPostBySlug, getPrevAndNext } from "@lib/api/posts";
import { Post } from "@lib/types";
import Head from "next/head";

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
        <header className="flex flex-col gap-2 pb-8">
          <h1 className="text-3xl md:leading-[60px!important] md:text-5xl dark:text-white">
            {post.title}
          </h1>
          <div className="flex items-center gap-4">
            {post.date ? (
              <p className="text-md text-gray-700 dark:text-slate-300">{post.date}</p>
            ) : (
              <div>DEV</div>
            )}
            <div>{post.categories && post.categories.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          </div>
        </header>
        {post.html && <StyledMarkdown html={post.html} />}
      </div>

      <nav className="flex flex-col md:grid md:grid-cols-2 gap-3 mt-4 mb-6">
        {prev ? (
          <NavButton href={`/posts/${prev.slug}`}>이전글: {prev.title}</NavButton>
        ) : (
          <div></div>
        )}
        {next ? (
          <NavButton className="sm:text-right" href={`/posts/${next.slug}`}>
            다음글: {next.title}
          </NavButton>
        ) : (
          <div></div>
        )}
      </nav>
      <Giscus
        id="comments"
        repo="leejss/tinyyard"
        repoId="R_kgDOHvoXPQ"
        categoryId="DIC_kwDOHvoXPc4CSXdq"
        mapping="pathname"
        // term="Welcome to @giscus/react component!"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
      />
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
