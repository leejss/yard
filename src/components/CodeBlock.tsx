"use client";
import "highlight.js/styles/obsidian.css";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import { ReactNode, useEffect } from "react";

export const CodeBlock = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    hljs.registerLanguage("javascript", javascript);
    const codes = document.querySelectorAll("code");

    if (codes && codes.length > 0) {
      codes.forEach((code) => {
        code.classList.add("ts");
        hljs.highlightElement(code);
      });
    }
  }, []);
  return <>{children}</>;
};
