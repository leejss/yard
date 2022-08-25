import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@components/Layout";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import env from "@lib/env";
import Page from "@components/storyblok/Page";
import Teaser from "@components/storyblok/Teaser";
import Grid from "@components/storyblok/Grid";
import Feature from "@components/storyblok/Feature";

storyblokInit({
  accessToken: env.BLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    teaser: Teaser,
    grid: Grid,
    feature: Feature,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
