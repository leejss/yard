import { GridBlok } from "@interfaces/storyblok/blok";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

interface GridProps {
  blok: GridBlok;
}

const Grid = (props: GridProps) => {
  return (
    <div {...storyblokEditable(props.blok)}>
      {props.blok.columns.map((nestedBlok) => {
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />;
      })}
    </div>
  );
};

export default Grid;
