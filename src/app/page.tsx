import { Posts } from "@/components/Posts";
import { getPosts } from "@/lib/get";

const HomePage = async () => {
  const posts = await getPosts({ page: 1, perPage: 50 });
  return <Posts posts={posts} />;
};

export default HomePage;
