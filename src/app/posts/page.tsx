import { IS_LOCAL } from "@/config";
import contentService from "@/lib/content.service";
import Link from "next/link";

const PostsPage = async () => {
  const publishd = await contentService.getPublisedContents();
  const drafted = await contentService.getDraftedContents();
  const showDrafted = IS_LOCAL && drafted.length > 0;
  return (
    <div>
      <ul className="text-lg text-foreground">
        {showDrafted &&
          drafted.map((post, index) => {
            return (
              <li key={index} className="px-2 py-1 hover:outline outline-emerald-500 rounded-md hover:text-emerald-700 text-foreground">
                <Link className="transition-[color] block w-full" href={"/posts/" + post.id}>
                  {post.title}
                </Link>
              </li>
            );
          })}
        {publishd.map((post, index) => {
          return (
            <li key={index} className="px-2 py-1 hover:outline outline-emerald-500 rounded-md hover:text-emerald-700 text-foreground">
              <Link className="transition-[color] block w-full" href={"/posts/" + post.id}>
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
