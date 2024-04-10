import { Link } from "@remix-run/react";
import type { PostListItemType } from "~/model/PostListItem";
import { formatDate } from "~/utils";

// TODO: need to validate the prosp before pass it

type PostListItemProps = {
	item: PostListItemType;
};

const PostListItem = ({ item }: PostListItemProps) => {
	const { date, slug, title } = item;
	const path = `/posts/${slug}`;
	return (
		<Link to={path}>
			<article className="[&_h2]:hover:text-red-400 [&_p]:hover:text-foreground">
				<header>
					<h2 className="text-foreground tracking-wide font-semibold text-lg md:text-2xl transition">{title}</h2>
				</header>
				<div>
					<p className="text-gray-500 text-sm md:text-lg transition">{formatDate(date)}</p>
				</div>
			</article>
		</Link>
	);
};

export default PostListItem;
