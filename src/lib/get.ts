import { vrite } from "@/lib/client";
import { Article } from "@/lib/model/Article";
import { gfmOutputTransformer } from "@vrite/sdk/transformers";

const GROUP_ID = "64a1841b4969669109fb5337";

type PageParams = {
  page?: number;
  perPage?: number;
};

export const getPublisehdContentPieces = async ({ page = 1, perPage = 50 }: PageParams) => {
  const res = await vrite.contentPieces.list({
    contentGroupId: GROUP_ID,
    page,
    perPage,
  });
  return res;
};

const getPublisehdContentPiece = async (id: string) => {
  const res = await vrite.contentPieces.get({
    id,
    content: true,
  });

  return res;
};

const getContentPieceIdBySlug = async (slug: string) => {
  const res = await vrite.contentPieces.list({
    contentGroupId: GROUP_ID,
    slug,
  });
  const piece = res[0];
  return piece.id;
};

export const getAritlceBySlug = async (slug: string) => {
  const id = await getContentPieceIdBySlug(slug);
  const piece = await getPublisehdContentPiece(id);
  const article = {
    title: piece.title,
    content: gfmOutputTransformer(piece.content),
    date: piece.date,
    tags: piece.tags.map((tag) => (tag.label ? tag.label : "")),
  };
  return new Article(article);
};
