import { VRITE_TOKEN } from "@/constant";
import { createClient } from "@vrite/sdk";

export const vrite = createClient({
  token: VRITE_TOKEN,
});
