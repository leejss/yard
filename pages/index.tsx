import Head from "next/head";
import Link from "next/link";

const links: {
  text: string;
  route: string;
}[] = [
  {
    text: "posts",
    route: "/posts",
  },
  {
    text: "about me",
    route: "/about",
  },
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
            <li
              key={link.route}
              className="text-2xl transition-colors md:text-3xl hover:text-gray-500"
            >
              <Link href={link.route}>
                <span className="underline cursor-pointer underline-offset-4">{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HomePage;
