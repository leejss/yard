import cn from "classnames";
import Link from "next/link";
import type { PropsWithChildren } from "react";

interface NavButtonProps {
  href: string;
  className?: string;
}

const NavButton = ({ href, children, className }: PropsWithChildren<NavButtonProps>) => {
  return (
    <div
      className={cn("cursor-pointer py-2 px-3 bg-gray-100 dark:bg-gray-600  rounded-md", className)}
    >
      <Link href={href}>
        <span>{children}</span>
      </Link>
    </div>
  );
};

export default NavButton;
