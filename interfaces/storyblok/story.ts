import type { StoryData } from "@storyblok/react";

// Story type
export interface PostStory {
  _uid: string;
  title: string;
  markdown: string;
  tags: string;
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
