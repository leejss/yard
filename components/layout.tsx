import type { ReactNode } from "react";
import Title from "./title";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="container mx-auto">
      <Title />
      <main className="px-4">{children}</main>
    </div>
  );
};

export default Layout;
