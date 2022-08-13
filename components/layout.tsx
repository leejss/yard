import type { ReactNode } from "react";
import MainTitle from "./title";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="container mx-auto">
      <MainTitle />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
