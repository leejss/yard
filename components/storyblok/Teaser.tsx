import { storyblokEditable } from "@storyblok/react";

const Teaser = (props: any) => {
  return <h2 {...storyblokEditable(props.blok)}>{props.blok.headline}</h2>;
};

export default Teaser;
