import { Posts } from "@/components/Posts";
import { getPosts } from "@/lib/services/post-service";

const HomePage = async () => {
  const posts = await getPosts();
  return <Posts posts={posts} />;
};

export default HomePage;
