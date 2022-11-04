import type { ReactNode } from "react";
import Link from "next/link";
import { PAGE_TITLE } from "@lib/constants";
import ThemeButton from "./ui/ThemeButton";

interface Props {
  children: ReactNode;
}

const Title = () => {
  return (
    <h1 className="text-3xl font-medium text-center transition-colors md:text-left md:text-5xl">
      <Link href="/">{PAGE_TITLE}</Link>
    </h1>
  );
};

const Layout = ({ children }: Props) => {
  return (
    <div className="sm:max-w-[1024px] mx-auto w-full pt-8 p-6">
      <header className="text-sm sm:text-base flex flex-col gap-6 border-b border-gray-300 mb-16 pb-4">
        <div>
          <Title />
          {/* <ThemeButton /> */}
        </div>
        <div className="flex justify-between text-gray-500 dark:text-slate-300">
          <div>
            <Link href="/posts">
              <a className="hover:underline">Posts</a>
            </Link>
          </div>
          <div className="flex gap-2">
            <Link href="https://github.com/leejss">
              <a className="hover:underline">Github</a>
            </Link>
            <Link href="https://www.linkedin.com/in/%EC%A2%85%EC%84%9C-%EC%9D%B4-5aa73a224/">
              <a className="hover:underline">LinkedIn</a>
            </Link>
          </div>
        </div>
      </header>
      <main className="py-4">{children}</main>
    </div>
  );
};

export default Layout;
