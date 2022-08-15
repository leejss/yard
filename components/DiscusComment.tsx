import env from "@lib/env";
import { DiscussionEmbed } from "disqus-react";
import { useRouter } from "next/router";

interface DiscusCommentProps {
  id: string;
  title: string;
}

const DiscusComment = ({ id, title }: DiscusCommentProps) => {
  const router = useRouter();
  return (
    <DiscussionEmbed
      shortname="tinyyard"
      config={{
        url: `${env.PAGE_URL}${router.asPath}`,
        identifier: id,
        title,
      }}
    />
  );
};

export default DiscusComment;
