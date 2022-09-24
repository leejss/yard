import PostBody from "components/post/PostBody";
import {
  getAllPost,
  getAllSlugs,
  getPostByPath,
  getPostBySlug,
  getPostPaths,
} from "lib/api/posts";

const TestPage = (props: any) => {
  const { post } = props;
  console.log(post);

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-2 pb-4 border-b-[0.5px] border-gray-300">
        <h1 className="text-3xl md:leading-[60px!important] md:text-5xl dark:text-white">
          {post.title}
        </h1>
        {/* {post.date ? (
          <p className="text-2xl">{foramtDate(post.publishedAt)}</p>
        ) : (
          <div>DEV</div>
        )} */}
        {/* <div>{post.tags && post.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div> */}
      </header>
      <PostBody html={post.html} />
    </div>
  );
};

export default TestPage;

export async function getStaticProps() {
  // const res = getAllPost();

  const res = await getPostBySlug("storyblok-as-content-source");

  return {
    props: {
      post: res,
    },
  };
}
