import Head from "next/head";
import type { ReactNode } from "react";
import MainTitle from "./title";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>tinyyard</title>
      </Head>
      <div className="container mx-auto pt-4">
        <MainTitle />
        <main className="p-4">{children}</main>
      </div>
    </>
  );
};

export default Layout;
