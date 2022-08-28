import type { StoryData } from "@storyblok/react";

export interface PostStory {
  _uid: string;
  title: string;
  markdown: string;
}

export type GenericStory<Content> = {
  data: {
    story: StoryData<Content>;
  };
  headers: any;
};

export type GenericStories<Content> = {
  data: {
    stories: StoryData<Content>[];
  };
  perPage: number;
  total: number;
  headers: any;
};
