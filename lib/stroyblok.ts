import Storyblok from "storyblok-js-client";
import env from "./env";

const StoryBlokClient = new Storyblok({
  accessToken: env.BLOK_PREVIEW_TOKEN,
});

export default StoryBlokClient;
