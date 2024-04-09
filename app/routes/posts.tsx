// 1. lists of posts
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
	return json({ posts: [] });
};

const PostsRoute = () => {
	const { posts } = useLoaderData<typeof loader>();
	return (
		<div>
			<h1>Posts</h1>
		</div>
	);
};

export default PostsRoute;
