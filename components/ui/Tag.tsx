import cn from "classnames";
import { TagType } from "interfaces/post";

interface TagProps {
  children: TagType;
}

const Tag = ({ children }: TagProps) => {
  return (
    <span
      className={cn(
        "px-2 py-1 text-sm font-bold bg-bl rounded-2xl",
        getColorSet(children)
      )}
    >
      {children}
    </span>
  );
};

export default Tag;

function getColorSet(tag: TagType) {
  switch (tag) {
    case "css":
      return "text-white bg-blue-500";
    case "javascript":
      return "text-black bg-yellow-300";
    case "nextjs":
      return "text-white bg-black";
    case "react":
      return "text-white bg-blue-700";
    case "typescript":
      return "text-white bg-blue-900";
    case "storybook":
      return "text-white bg-pink-600";
    case "git":
      return "text-white bg-[#e94d32]";
    case "etc":
      return "text-white bg-gray-600";
    default:
      return "";
  }
}
