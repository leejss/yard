export function getEnv() {
  return {
    VRITE_TOKEN: process.env.VRITE_TOKEN as string,
    VRITE_GROUP_ID: process.env.VRITE_GROUP_ID as string,
    API_URL: "https://api.vrite.io",
  };
}
type ENV = ReturnType<typeof getEnv>;

declare global {
  // eslint-disable-next-line
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
