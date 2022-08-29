import Layout from "components/Layout";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { API_TOKEN } from "lib/constants";

storyblokInit({
  accessToken: API_TOKEN,
  use: [apiPlugin],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
