import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { validatePostContent } from "~/model/Post";
import { formatDate } from "~/utils";
import { createPostService } from "~/utils/get-posts";
import { parseMarkdown } from "~/utils/markdown";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const slug = params.slug;
	invariant(slug, "slug is required");
	const postService = createPostService();
	const post = await postService.getPostBySlug(slug);

	return json({
		...post,
		html: await parseMarkdown(post.content),
	});
};

const PostDetailRoute = () => {
	const data = useLoaderData<typeof loader>();
	const post = validatePostContent(data);

	return (
		<div className="post">
			<article className="post pb-12 w-full">
				<header className="py-4">
					<h1 className="text-xl md:text-3xl font-bold text-foreground">{post.title}</h1>
					<time className="text-foreground">{formatDate(post.date)}</time>
				</header>
				<div
					className="prose text-foreground font-mono"
					dangerouslySetInnerHTML={{
						__html: post.html,
					}}
				/>
			</article>
		</div>
	);
};

export default PostDetailRoute;
