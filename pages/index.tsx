import { PostType } from "@interfaces/post";
import { GenericStories, PostStory } from "@interfaces/storyblok/story";
import StoryBlokClient from "@lib/stroyblok";

interface Props {
  posts: PostType[];
}

export default function HomePage({ posts }: Props) {
  console.log(posts);

  return <div></div>;
}

export async function getStaticProps() {
  const { data }: GenericStories<PostStory> = await StoryBlokClient.get(
    `cdn/stories`,
    {
      version: "draft",
      starts_with: "posts/",
    }
  );

  const posts: PostType[] = data.stories.map((story) => {
    return {
      id: story.content._uid,
      slug: story.slug,
      title: story.content.title,
      createdAt: story.created_at,
      publishedAt: story.published_at,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
