import { type Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import type { ContentPiece } from "~/utils/get-vrite";

export const postListItemSchema = Type.Object({
  title: Type.String(),
  date: Type.Number(),
  slug: Type.String(),
  id: Type.String(),
});

export type PostListItemType = Static<typeof postListItemSchema>;

// Accept larget type and return narrow type
export const createPostListItem = (
  contentPiece: ContentPiece,
): PostListItemType => {
  return {
    title: contentPiece.title,
    date: contentPiece.date ? new Date(contentPiece.date).getTime() : 0,
    slug: contentPiece.slug,
    id: contentPiece.id,
  };
};

export const validatePostListItem = (data: unknown): PostListItemType => {
  return Value.Cast(postListItemSchema, data);
};
