import type { ReactNode } from "react";
import { PAGE_TITLE } from "lib/constants";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="container mx-auto p-14">
      <header className="mb-4">
        <h1 className="text-5xl font-bold text-center transition-colors md:text-left md:text-7xl hover:text-gray-500 ">
          <Link href="/">{PAGE_TITLE}</Link>
        </h1>
      </header>
      <main className="py-4">{children}</main>
    </div>
  );
};

export default Layout;
