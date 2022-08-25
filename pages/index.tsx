import logger from "@lib/logger";
import StoryBlokClient from "@lib/stroyblok";
import {
  getStoryblokApi,
  StoryblokComponent,
  useStoryblokState,
} from "@storyblok/react";
import type { StoryData } from "@storyblok/react";

export default function HomePage({ data }: any) {
  // const story = useStoryblokState(data.story);

  return <div>{/* <StoryblokComponent blok={story.content!} /> */}</div>;
}

export async function getStaticProps() {
  const api = getStoryblokApi();
  const { data } = await api.get(`cdn/stories/home`, {
    version: "draft",
  });

  return {
    props: {
      // data,
    },
  };
}
