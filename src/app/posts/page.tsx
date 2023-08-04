import getPosts from "@/utils/getPosts";
import Link from "next/link";

const PostsPage = async () => {
  const posts = await getPosts();
  return (
    <div>
      <ul className="text-lg text-foreground">
        {posts.map((post, index) => {
          return (
            <li key={index} className="px-2 py-1 hover:outline outline-emerald-500 rounded-md hover:text-emerald-700 text-foreground">
              <Link className="transition-[color] block w-full" href={"/posts/" + post.slug}>
                {post.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostsPage;
