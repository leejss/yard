import { Posts } from "@/components/Posts";
import { Title } from "@/components/Title";
import { getPosts } from "@/lib/get";

const HomePage = async () => {
  const posts = await getPosts({ page: 1, perPage: 50 });
  return (
    <div>
      {/* <Title>sticky notes</Title> */}
      {/* <div>
        <Posts posts={posts} />
      </div> */}
    </div>
  );
};

export default HomePage;
