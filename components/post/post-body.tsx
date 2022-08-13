import StyledMarkdown from "@components/styled-markdown";

interface Props {
  html?: string | null;
}

const PostBody = ({ html }: Props) => {
  if (!html) return <div>No Content</div>;
  return (
    <div>
      <StyledMarkdown html={html} />
    </div>
  );
};

export default PostBody;
