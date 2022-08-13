import type { PostOrPage } from "@tryghost/content-api";
import ghostAPI from "./ghost-instance";

type Field = keyof PostOrPage;

export async function getAllPosts(fields?: Field[]) {
  const result = await ghostAPI.posts.browse({
    limit: "all",
    fields: fields,
  });

  return result;
}

export async function getSinglePost(slug: string, fields?: Field[]) {
  const result = await ghostAPI.posts.read(
    {
      slug,
    },
    {
      fields,
    }
  );
  return result;
}
