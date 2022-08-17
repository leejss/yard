import styles from "./styled-markdown.module.css";
import cn from "classnames";
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-typescript.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-tsx.min";

interface Props {
  html: string;
}

const StyledMarkdown = ({ html }: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

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
