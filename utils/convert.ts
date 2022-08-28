import { PostType } from "@interfaces/post";
import { GenericStory, PostStory } from "@interfaces/storyblok/story";
import markdownToHtml from "@lib/markdownToHtml";

export function convertPostBlokToPost(postBlok: any) {}

export async function postStoryToPost(
  res: GenericStory<PostStory>
): Promise<PostType> {
  return {
    id: res.data.story.content._uid,
    slug: res.data.story.slug,
    title: res.data.story.content.title,
    html: await markdownToHtml(res.data.story.content.markdown),
  };
}
