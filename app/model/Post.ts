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

export const postContentSchema = Type.Object({
  title: Type.String(),
  date: Type.String(),
  content: Type.String(),
  html: Type.String(),
  tags: Type.Array(Type.String()),
});

export type PostContentType = Static<typeof postContentSchema>;

export const validatePostContent = (data: unknown): PostContentType => {
  return Value.Cast(postContentSchema, data);
};
