import Post from "@/components/Post";
import { PostService } from "@/lib/services/post-service";

interface PageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PageProps) => {
  const post = await PostService.getPostBySlug(params.slug);
  return <Post post={post} />;
};

export default PostPage;
