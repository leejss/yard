// 1. lists of posts
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostListItem from "~/components/post-list-item";

export const loader = async () => {
	return json({
		posts: [
			{
				title: "Post 1",
				date: "2021-01-01",
				slug: "post-1",
			},
		],
	});
};

const PostsRoute = () => {
	const { posts } = useLoaderData<typeof loader>();
	return (
		<div>
			<ul>
				{posts.map((post) => {
					return (
						<li key={post.title}>
							<PostListItem item={post} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default PostsRoute;
