import { Posts } from "@/components/Posts";
import { Title } from "@/components/Title";
import { getPublisehdContentPieces } from "@/lib/get";

const HomePage = async () => {
  const posts = await getPublisehdContentPieces({ page: 1, perPage: 50 });
  return (
    <div>
      <Title>sticky notes</Title>
      <Posts posts={posts} />
    </div>
  );
};

export default HomePage;
