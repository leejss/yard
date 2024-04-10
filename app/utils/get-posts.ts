import { gfmOutputTransformer } from "@vrite/sdk/transformers";
import ky from "ky";
import queryString from "query-string";
import { createPostListItem } from "~/model/Post";
import { getEnv } from "~/utils/get-env";
import type { vriteClient } from "~/utils/get-vrite";

type PageParams = {
  page?: number;
  perPage?: number;
};

export const createPostService = () => {
  const GROUP_ID = "64a1841b4969669109fb5337";
  const { API_URL, VRITE_GROUP_ID, VRITE_TOKEN } = getEnv();

  const getPosts = async ({ page = 1, perPage = 50 }: PageParams) => {
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

    const posts = json.map(createPostListItem).sort((a, b) => b.date - a.date);

    return posts;
  };

  const getPublisehdContentPiece = async (id: string) => {
    const params = queryString.stringify({
      id,
      content: true,
      description: "text",
    });

    const res = await ky.get(`${API_URL}/content-pieces?${params}`, {
      headers: {
        Authorization: `Bearer ${VRITE_TOKEN}`,
      },
    });

    const json = await res.json<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ReturnType<typeof vriteClient.contentPieces.get<any, true>>
    >();

    return json;
  };

  const getContentPieceIdBySlug = async (slug: string) => {
    const params = queryString.stringify({
      contentGroupId: GROUP_ID,
      slug,
      // page: 1,
      // perPage: 20,
    });
    const res = await ky.get(`${API_URL}/content-pieces/list?${params}`, {
      headers: {
        Authorization: `Bearer ${VRITE_TOKEN}`,
      },
      // cache: "no-cache",
    });

    const json =
      await res.json<ReturnType<typeof vriteClient.contentPieces.list>>();
    const piece = json[0];
    return piece.id;
  };

  const getPostBySlug = async (slug: string) => {
    const id = await getContentPieceIdBySlug(slug);
    const piece = await getPublisehdContentPiece(id);
    const post = {
      title: piece.title,
      content: gfmOutputTransformer(piece.content),
      date: piece.date,
      tags: piece.tags.map((tag) => (tag.label ? tag.label : "")),
    };
    return post;
  };

  return {
    getPosts,
    getPostBySlug,
  };
};
