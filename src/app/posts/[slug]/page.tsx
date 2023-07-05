import contentService from "@/lib/content.service";
import { htmlTransformer } from "@vrite/sdk/transformers";
import dayjs from "dayjs";

interface PageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PageProps) => {
  const post = await contentService.getContentPiece(params.slug);
  const content = htmlTransformer(post.content);
  return (
    <article>
      <header className="py-4">
        <h1 className="text-xl">{post.title}</h1>
        <h2>{dayjs(post.date).format("YYYY/MM/DD")}</h2>
      </header>
      <div
        className="prose dark:prose-invert !text-foreground"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
};

export default PostPage;
