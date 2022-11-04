import { atom, useAtom } from "jotai";
import { useEffect } from "react";

export const colorModeAtom = atom<"light" | "dark">("light");

const useColorMode = () => {
  const [colorMode, setColorMode] = useAtom(colorModeAtom);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setColorMode("dark");
    }
  }, [setColorMode]);
  return colorMode;
};

export default useColorMode;
