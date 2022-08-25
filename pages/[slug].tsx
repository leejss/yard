import { getStoryblokApi } from "@storyblok/react";
import type { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  story: any;
}

export default function DynamicPage(props: any) {
  return (
    <div>
      <h1>DynamicPage</h1>
      <h2>{props.param.slug}</h2>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      param: context.params,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const api = getStoryblokApi();
  const result = await api.get(`cdn/links/`);

  console.log(JSON.stringify(result.data, null, 2));

  return {
    paths: [
      {
        params: {
          slug: "about",
        },
      },
    ],
    fallback: false,
  };
};

// Story generate link

// Folder creates hierarchy
