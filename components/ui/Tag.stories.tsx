import type { ComponentMeta } from "@storybook/react";
import Tag from "./Tag";

export default {
  title: "UI/Tag",
  component: Tag,
} as ComponentMeta<typeof Tag>;

export const Example = () => {
  return <Tag>React</Tag>;
};
