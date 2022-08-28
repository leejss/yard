import styles from "./styled-markdown.module.css";
import cn from "classnames";

interface Props {
  html: string;
}

const StyledMarkdown = ({ html }: Props) => {
  return (
    <div className={cn(styles.markdown)}>
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
};

export default StyledMarkdown;
