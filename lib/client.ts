import StoryBlok from "storyblok-js-client";
import { API_TOKEN } from "@lib/constants";

const ApiClient = new StoryBlok({
  accessToken: API_TOKEN,
});

export default ApiClient;
