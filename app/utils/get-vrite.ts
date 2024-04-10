import { createClient } from "@vrite/sdk";
import { getEnv } from "~/utils/get-env";

function createVrite() {
  const { VRITE_TOKEN } = getEnv();
  let client: ReturnType<typeof createClient> | null = null;
  return {
    get client() {
      if (!client) {
        client = createClient({
          token: VRITE_TOKEN,
        });
      }
      return client;
    },
  };
}

export const vriteClient = createVrite().client;

export type ContentPiece = Awaited<
  ReturnType<typeof vriteClient.contentPieces.list>
>[number];
