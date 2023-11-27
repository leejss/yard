import Post from "@/components/Post";
import { getAritlceBySlug } from "@/lib/get";

interface PageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PageProps) => {
  const post = await getAritlceBySlug(params.slug!);
  return <Post post={post} />;
};

export default PostPage;
