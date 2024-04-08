import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "tinyyard" },
    // { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <section>
      <header>
        <h1 className=" text-xl">testing...</h1>
      </header>
    </section>
  );
}
