import type { ComponentMeta } from "@storybook/react";
import { TagType } from "interfaces/post";
import Tag from "../../ui/Tag";

export default {
  title: "UI/Tag",
  component: Tag,
} as ComponentMeta<typeof Tag>;

const tags: TagType[] = [
  "css",
  "javascript",
  "nextjs",
  "react",
  "storybook",
  "typescript",
];

export const Example = () => {
  return (
    <div>
      {tags.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  );
};
