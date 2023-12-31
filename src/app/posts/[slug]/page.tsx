import Post from "@/components/Post";
import { getAritlceBySlug } from "@/lib/get";

interface PageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PageProps) => {
  const post = await getAritlceBySlug(params.slug!);
  return (
    <div className="container mx-auto px-4">
      <Post post={post} />
    </div>
  );
};

export default PostPage;
