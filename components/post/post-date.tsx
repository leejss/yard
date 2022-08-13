import { foramtDate } from "@utils/format-helpter";

interface Props {
  date?: string | null;
}

const PostDate = ({ date }: Props) => {
  if (!date) return null;
  return (
    <div className="text-3xl">
      —<time>{foramtDate(date)}</time>
    </div>
  );
};

export default PostDate;
