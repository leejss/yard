import { API_URL, GROUP_ID, VRITE_TOKEN } from "@/constant";
import { vrite } from "@/lib/vrite";
import { foramtDate, parseMarkdown } from "@/lib/utils";
import { gfmOutputTransformer } from "@vrite/sdk/transformers";
import { postIdCache } from "../caching";

export type PostListItemModel = {
  id: string;
  title: string;
  date: string;
  slug: string;
};

export type PostModel = {
  title: string;
  html: string;
  date: string;
  tags: string[];
};
export const getPosts = async (): Promise<PostListItemModel[]> => {
  const contentPiecs = await vrite.contentPieces.list({
    contentGroupId: GROUP_ID,
  });

  contentPiecs.forEach((piece) => {
    const { id, slug } = piece;
    postIdCache.set(slug, id);
  });

  return contentPiecs.map((contentPiece) => {
    return {
      id: contentPiece.id,
      title: contentPiece.title ?? "",
      date: contentPiece.date ? foramtDate(contentPiece.date) : "",
      slug: contentPiece.slug ?? "",
    };
  });
};

export const getPostById = async (id: string): Promise<PostModel> => {
  const contentPiece = await vrite.contentPieces.get({
    id,
    content: true,
  });
  const content = gfmOutputTransformer(contentPiece.content!);
  const html = await parseMarkdown(content);
  return {
    title: contentPiece.title ?? "",
    date: contentPiece.date ?? "",
    tags: contentPiece.tags.map((v) => v.label!) ?? [],
    html,
  };
};

// type PageParams = {
//   page: number;
//   perPage?: number;
// };

// type VriteContentListItem = Awaited<ReturnType<typeof vrite.contentPieces.list>>[number];
// type VriteContentPiece = Awaited<ReturnType<typeof vrite.contentPieces.get>>;

// class PostServiceConverter {
//   static convertToPostListItem(data: VriteContentListItem): PostListItemModel {
//     return {
//       title: data.title ?? "",
//       date: data.date ? foramtDate(data.date) : "",
//       slug: data.slug ?? "",
//       id: data.id,
//     };
//   }

//   static async convertToPostModel(data: VriteContentPiece): Promise<PostModel> {
//     const content = gfmOutputTransformer(data.content!);
//     const html = await parseMarkdown(content);
//     return {
//       title: data.title ?? "",
//       date: data.date ?? "",
//       tags: data.tags.map((v) => v.label!) ?? [],
//       html,
//     };
//   }
// }

// export class PostService {
//   static GROUP_ID = "64a1841b4969669109fb5337";

//   static httpClient = ky.create({
//     headers: {
//       Authorization: `Bearer ${VRITE_TOKEN}`,
//     },
//   });

//   private static async getVriteContentBySlug(slug: string) {
//     let contentPieceId = "";
//     {
//       const endpoint = `${API_URL}/content-pieces/list?contentGroupId=${this.GROUP_ID}&slug=${slug}&page=1&perPage=20`;
//       const content = await this.httpClient.get(endpoint).json<ReturnType<typeof vrite.contentPieces.list>>();

//       contentPieceId = content[0].id;
//     }

//     const params = queryString.stringify({
//       id: contentPieceId,
//       content: true,
//       description: "text",
//     });
//     const endpoint = `${API_URL}/content-pieces?${params}`;

//     const json = await this.httpClient.get(endpoint).json<ReturnType<typeof vrite.contentPieces.get>>();

//     return json;
//   }
//   static async getPostBySlug(slug: string) {
//     const data = await this.getVriteContentBySlug(slug);
//     return PostServiceConverter.convertToPostModel(data);
//   }
// }
