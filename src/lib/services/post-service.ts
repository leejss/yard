import { API_URL, VRITE_TOKEN } from "@/constant";
import { vrite } from "@/lib/client";
import { parseMarkdown } from "@/lib/utils";
import { gfmOutputTransformer } from "@vrite/sdk/transformers";
import ky from "ky";
import queryString from "query-string";

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

type PageParams = {
  page: number;
  perPage?: number;
};

type VriteContentListItem = Awaited<
  ReturnType<typeof vrite.contentPieces.list>
>[number];

type VriteContentPiece = Awaited<ReturnType<typeof vrite.contentPieces.get>>;

class PostServiceConverter {
  static convertToPostListItem(data: VriteContentListItem): PostListItemModel {
    return {
      title: data.title ?? "",
      date: data.date ?? "",
      slug: data.slug ?? "",
      id: data.id,
    };
  }

  static async convertToPostModel(data: VriteContentPiece): Promise<PostModel> {
    const content = gfmOutputTransformer(data.content!);
    const html = await parseMarkdown(content);
    return {
      title: data.title ?? "",
      date: data.date ?? "",
      tags: data.tags.map((v) => v.label!) ?? [],
      html,
    };
  }
}

export class PostService {
  static GROUP_ID = "64a1841b4969669109fb5337";

  static httpClient = ky.create({
    headers: {
      Authorization: `Bearer ${VRITE_TOKEN}`,
    },
  });

  private static async getAllVriteContents(
    params: PageParams = {
      page: 1,
      perPage: 50,
    },
  ) {
    const endpoint = `${API_URL}/content-pieces/list?contentGroupId=${this.GROUP_ID}&${queryString.stringify(
      params,
    )}`;

    const json = await this.httpClient
      .get(endpoint)
      .json<ReturnType<typeof vrite.contentPieces.list>>();

    return json;
  }

  static async getPostList(): Promise<PostListItemModel[]> {
    const contents = await this.getAllVriteContents();
    return contents.map(PostServiceConverter.convertToPostListItem);
  }

  private static async getVriteContentBySlug(slug: string) {
    let contentPieceId = "";
    {
      const endpoint = `${API_URL}/content-pieces/list?contentGroupId=${this.GROUP_ID}&slug=${slug}&page=1&perPage=20`;
      const content = await this.httpClient
        .get(endpoint)
        .json<ReturnType<typeof vrite.contentPieces.list>>();

      contentPieceId = content[0].id;
    }

    const params = queryString.stringify({
      id: contentPieceId,
      content: true,
      description: "text",
    });
    const endpoint = `${API_URL}/content-pieces?${params}`;

    const json = await this.httpClient
      .get(endpoint)
      .json<ReturnType<typeof vrite.contentPieces.get>>();

    return json;
  }
  static async getPostBySlug(slug: string) {
    const data = await this.getVriteContentBySlug(slug);
    return PostServiceConverter.convertToPostModel(data);
  }
}
