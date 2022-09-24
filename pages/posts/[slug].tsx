import StyledMarkdown from "components/StyledMarkdown";
import Tag from "components/ui/Tag";
import { getAllSlugs, getPostBySlug } from "lib/api/posts";
import { Post } from "lib/types";

interface Props {
  post: Post;
}

export default function PostPage({ post }: Props) {
  return (
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
  return {
    props: {
      post,
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
