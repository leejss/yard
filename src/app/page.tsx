import { Posts } from "@/components/Posts";
import { getPublisehdContentPieces } from "@/lib/get";

const HomePage = async () => {
  const posts = await getPublisehdContentPieces({ page: 1, perPage: 50 });
  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
};

export default HomePage;
