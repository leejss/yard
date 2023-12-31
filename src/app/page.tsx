import { Posts } from "@/components/Posts";
import { Title } from "@/components/Title";
import { getPosts } from "@/lib/get";

const HomePage = async () => {
  const posts = await getPosts({ page: 1, perPage: 50 });
  return (
    <>
      <Title>sticky notes</Title>
      <div className="relative container mx-auto px-4 pb-[120px]">
        <Posts posts={posts} />
      </div>
    </>
  );
};

export default HomePage;
