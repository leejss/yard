import vrite from "./api";

export class ContentService {
  private _publishedId = "64a1841b4969669109fb5337";
  async _getContentGroupId(name: "Published" | "Drafts") {
    const result = await vrite.contentGroups.list();
    const id = result.find((data) => data.name === name)?.id;
    if (!id) throw new Error(`${name} is not valid name`);
    return id;
  }

  async getPublisedContents() {
    const result = await vrite.contentPieces.list({
      contentGroupId: this._publishedId,
      perPage: 50,
    });
    return result;
  }

  async getContentPiece(id: string) {
    const result = await vrite.contentPieces.get({
      id,
      content: true,
    });
    return result;
  }
}

const contentService = new ContentService();

export default contentService;
