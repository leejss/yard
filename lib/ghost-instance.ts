import GhostContentAPI from "@tryghost/content-api";
import env from "./env";

const ghostAPI = new GhostContentAPI({
  key: env.GHOST_API_KEY!,
  url: env.GHOST_API_URL!,
  version: "v3",
});

export default ghostAPI;
