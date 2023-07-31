import dayjs from "dayjs";
import getPost from "./utils/getPost";
import parseMarkdown from "./utils/parseMarkdown";

interface PageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PageProps) => {
  const post = await getPost(params.slug);
  const html = await parseMarkdown(post.content);

  return (
    <article>
      <header className="py-4">
        <h1 className="text-xl">{post.title}</h1>
        <h2>{dayjs(post.date).format("YYYY/MM/DD")}</h2>
      </header>
      <div
        className="prose dark:prose-invert !text-foreground"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </article>
  );
};

export default PostPage;
