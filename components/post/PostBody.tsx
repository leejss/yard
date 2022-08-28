import StyledMarkdown from "components/StyledMarkdown";

interface Props {
  html?: string | null;
}

const PostBody = ({ html }: Props) => {
  if (!html) return <div>No Content</div>;
  return <StyledMarkdown html={html} />;
};

export default PostBody;
