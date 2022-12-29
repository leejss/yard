import Head from "next/head";
import Link from "next/link";

const links: {
  text: string;
  route: string;
}[] = [
  {
    text: "Posts",
    route: "/posts",
  },
  // {
  //   text: "About Me",
  //   route: "/about",
  // },
];

const HomePage = () => {
  return (
    <>
      <Head>
        <title>tinyyard | home</title>
      </Head>
      <div>
        <ul className="flex flex-col gap-2">
          {links.map((link) => (
            <li key={link.route} className="text-xl sm:text-2xl hover:underline">
              <Link href={link.route}>
                <a className="cursor-pointer underline-offset-4">{link.text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HomePage;
