import ghostAPI from "./ghost-instance";

export async function getAllPosts() {
  const result = await ghostAPI.posts.browse({
    limit: "all",
  });

  return result;
}

export async function getSinglePost(slug: string) {
  const result = await ghostAPI.posts.read({
    slug,
  });
  return result;
}
