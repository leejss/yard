// 1. lists of posts
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostListItem from "~/components/post-list-item";
import { validatePostListItem } from "~/model/PostListItem";
import { getPosts } from "~/utils/get-posts";

export const loader = async () => {
	const posts = await getPosts({
		page: 1,
		perPage: 50,
	});

	return json({
		posts,
	});
};

const PostsRoute = () => {
	const posts = useLoaderData<typeof loader>().posts.map(validatePostListItem);

	return (
		<div className="pt-4">
			<ul className="flex flex-col gap-4 md:gap-6">
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
