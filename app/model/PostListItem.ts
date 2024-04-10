import { type Static, Type } from "@sinclair/typebox";

export const postListItemSchema = Type.Object({
  title: Type.String(),
  date: Type.String(),
  slug: Type.String(),
});

export type PostListItemType = Static<typeof postListItemSchema>;
