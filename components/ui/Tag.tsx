import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
}

const Tag = ({ children }: TagProps) => {
  return <span className="bg-indigo-600">{children}</span>;
};

export default Tag;
