import { getAllPosts, getSinglePost } from "@lib/ghost-api";
import type { PostOrPage } from "@tryghost/content-api";

interface Props {
  post: PostOrPage;
}

export default function PostPage({ post }: Props) {
  console.log({ post });

  return (
    <div>
      <h1>{post.title}</h1>
      <h1>{post.created_at}</h1>
      {/* <div
        dangerouslySetInnerHTML={{
          __html: post.html,
        }}
      ></div> */}
    </div>
  );
}

interface PageParams {
  params: {
    slug: string;
  };
}
export async function getStaticProps({ params }: PageParams) {
  const post = await getSinglePost(params.slug);
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPosts();
  return {
    paths: allPosts.map((post) => `/posts/${post.slug}`),
    fallback: false,
  };
}

// list of paths 정적 생성
// 다이나익 라우트를 사용하는 곳에서 정의 어떤 path를 정적 생성할 것인가 ?
//getStaticPaths 에 정의한 파일을 정적 생성
