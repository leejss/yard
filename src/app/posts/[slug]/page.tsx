import Post from "@/components/Post";
import { postIdCache } from "@/lib/caching";
import { getPostById } from "@/lib/services/post-service";

interface PageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PageProps) => {
  const postId = postIdCache.get(params.slug);
  const post = await getPostById(postId!);
  return <Post post={post} />;
};

export default PostPage;
