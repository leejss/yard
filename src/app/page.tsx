import { Posts } from "@/components/Posts";
import { PostService } from "@/lib/services/post-service";

const HomePage = async () => {
  const posts = await PostService.getPostList();
  return <Posts posts={posts} />;
};

export default HomePage;
