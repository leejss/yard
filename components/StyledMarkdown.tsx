interface Props {
  html: string;
}

const StyledMarkdown = ({ html }: Props) => {
  return (
    <div
      className="prose max-w-none prose-a:text-[#16ab86] hover:prose-a:text-[#29e8b8] dark:prose-invert prose-stone md:prose-lg lg:prose-xl prose-code:text-[#eb5757]"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

export default StyledMarkdown;
