interface Props {
  title?: string;
}

const PostTitle = ({ title }: Props) => {
  if (!title) return null;
  return <h1 className="text-5xl">{title}</h1>;
};

export default PostTitle;
