import { FeatureBlok } from "interfaces/storyblok/blok";
import { storyblokEditable } from "@storyblok/react";

interface FeatureProps {
  blok: FeatureBlok;
}

const Feature = ({ blok }: FeatureProps) => {
  return <div {...storyblokEditable(blok)}>{blok.name}</div>;
};

export default Feature;
