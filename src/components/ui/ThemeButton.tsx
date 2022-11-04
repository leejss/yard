import useColorMode from "@lib/hooks/useColorMode";

const ThemeButton = () => {
  const colorMode = useColorMode();
  return <div>{colorMode === "dark" ? "dark" : "light"}</div>;
};

export default ThemeButton;
