import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

interface PageProps {
  blok: any;
}

const Page = ({ blok }: PageProps) => {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body.map((nestedBlok: any) => {
        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />;
      })}
    </main>
  );
};

export default Page;
