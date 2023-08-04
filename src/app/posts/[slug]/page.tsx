import Post from "@/components/Post";
import getPost from "@/utils/getPost";

interface PageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PageProps) => {
  const post = await getPost(params.slug);
  return <Post post={post} />;
};

export default PostPage;
