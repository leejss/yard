import { PostType } from "interfaces/post";
import {
  GenericStories,
  GenericStory,
  PostStory,
} from "interfaces/storyblok/story";
import ApiClient from "./client";
import { __DEV__ } from "./constants";
import markdownToHtml from "./markdownToHtml";

const version = __DEV__ ? "draft" : "published";

type OptionalPostField = "html" | "createdAt" | "publishedAt";

export async function getAllPostStories() {
  const { data }: GenericStories<PostStory> = await ApiClient.get(
    `cdn/stories`,
    {
      version,
      starts_with: "posts/",
    }
  );
  return data.stories;
}

export async function getSinglePostStory(slug: string) {
  const { data }: GenericStory<PostStory> = await ApiClient.get(
    `cdn/stories/posts/${slug}`,
    {
      version,
    }
  );
  return data.story;
}

export async function getAllPosts(fields: OptionalPostField[] = []) {
  const stories = await getAllPostStories();
  return stories.map((story) => {
    const post: PostType = {
      id: story.content._uid,
      slug: story.slug,
      title: story.content.title,
    };
    fields.forEach(async (field) => {
      if (field === "createdAt") {
        post[field] = story.created_at;
      }
      if (field === "html") {
        post[field] = await markdownToHtml(story.content.markdown);
      }
      if (field === "publishedAt") {
        post[field] = story.published_at;
      }
    });
    return post;
  });
}

export async function getSinglePost(
  slug: string,
  fields: OptionalPostField[] = []
) {
  const story = await getSinglePostStory(slug);
  const post: PostType = {
    id: story.content._uid,
    slug: story.slug,
    title: story.content.title,
  };
  fields.forEach(async (field) => {
    if (field === "createdAt") {
      post[field] = story.created_at;
    }
    if (field === "html") {
      post[field] = await markdownToHtml(story.content.markdown);
    }
    if (field === "publishedAt") {
      post[field] = story.published_at;
    }
  });
  return post;
}
