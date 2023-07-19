import { createClient } from "@vrite/sdk/api";

const vrite = createClient({
  token: process.env.NEXT_PUBLIC_VRITE_TOKEN!,
});

export default vrite;
