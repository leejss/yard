//generateStaticParams

import getPost from "./utils/getPost";

interface PageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PageProps) => {
  const post = getPost(params.slug);
  // 1. get slug from params
  // 2. get files using slug
  // 3. Parse markdown string
  return <div>Post page</div>;
};

export default PostPage;
