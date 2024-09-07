import Link from "next/link";
import styles from "./PageNav.module.css";

export default function PageNav() {
  return (
    <nav className={styles.PageNav}>
      <header className="container mx-auto flex h-full flex-1 items-center">
        <div className="flex items-center gap-4">
          <Link className="font-sans text-xl text-foreground hover:underline" href="/">
            Posts
          </Link>
        </div>
        <div className="flex items-center"></div>
      </header>
    </nav>
  );
}
