import ky from "ky";
import queryString from "query-string";
import { createPostListItem } from "~/model/PostListItem";
import { getEnv } from "~/utils/get-env";
import type { vriteClient } from "~/utils/get-vrite";

// const GROUP_ID = "64a1841b4969669109fb5337";

type PageParams = {
  page?: number;
  perPage?: number;
};

export const getPosts = async ({ page = 1, perPage = 50 }: PageParams) => {
  const { API_URL, VRITE_GROUP_ID, VRITE_TOKEN } = getEnv();
  const pageParams = queryString.stringify({
    page,
    perPage,
  });

  const res = await ky.get(
    `${API_URL}/content-pieces/list?contentGroupId=${VRITE_GROUP_ID}&${pageParams}`,
    {
      headers: {
        Authorization: `Bearer ${VRITE_TOKEN}`,
      },
      // cache: "no-cache",
    },
  );
  const json =
    await res.json<ReturnType<typeof vriteClient.contentPieces.list>>();

  const posts = json
    .map(createPostListItem)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return posts;
};
