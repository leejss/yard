import ghostAPI from "./ghost-instance";

export async function getAllPosts() {
  const result = await ghostAPI.posts.browse({
    limit: "all",
  });
  return result;
}
