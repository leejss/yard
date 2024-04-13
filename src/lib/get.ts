import { API_URL, VRITE_TOKEN } from "@/constant";
import { vrite } from "@/lib/client";
import { Article } from "@/lib/model/Article";
import { PostListItem } from "@/lib/model/PostListItem";
import { gfmOutputTransformer } from "@vrite/sdk/transformers";
import ky from "ky";
import queryString from "query-string";

const GROUP_ID = "64a1841b4969669109fb5337";

type PageParams = {
  page?: number;
  perPage?: number;
};

export const getPosts = async ({ page = 1, perPage = 50 }: PageParams) => {
  const pageParams = queryString.stringify({
    page,
    perPage,
  });

  const res = await ky.get(`${API_URL}/content-pieces/list?contentGroupId=${GROUP_ID}&${pageParams}`, {
    headers: {
      Authorization: `Bearer ${VRITE_TOKEN}`,
    },
    // cache: "no-cache",
  });
  const json = await res.json<ReturnType<typeof vrite.contentPieces.list>>();
  const posts = json.map((piece) => new PostListItem(piece)).sort((a, b) => b.date.getTime() - a.date.getTime());
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
    // cache: "no-cache",
  });

  const json = await res.json<ReturnType<typeof vrite.contentPieces.get>>();
  return json;
};

const getContentPieceIdBySlug = async (slug: string) => {
  const params = queryString.stringify({
    contentGroupId: GROUP_ID,
    slug,
    page: 1,
    perPage: 20,
  });
  const res = await ky.get(`${API_URL}/content-pieces/list?${params}`, {
    headers: {
      Authorization: `Bearer ${VRITE_TOKEN}`,
    },
    // cache: "no-cache",
  });

  const json = await res.json<ReturnType<typeof vrite.contentPieces.list>>();
  const piece = json[0];
  return piece.id;
};

export const getAritlceBySlug = async (slug: string) => {
  const id = await getContentPieceIdBySlug(slug);
  const piece = await getPublisehdContentPiece(id);
  const article = {
    title: piece.title,
    content: gfmOutputTransformer(piece.content!),
    date: piece.date,
    tags: piece.tags.map((tag) => (tag.label ? tag.label : "")),
  };
  return new Article(article);
};
