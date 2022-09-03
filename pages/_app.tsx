import Layout from "components/Layout";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return getLayout(<Component {...pageProps} />);
}
