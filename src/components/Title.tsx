interface TitleProps {
  children: string;
}

export const Title = ({ children }: TitleProps) => {
  return <h1 className="text-3xl md:text-5xl text-emerald-700 dark:text-emerald-500 border-b border-b-emerald-500 pb-4 mb-4">{children}</h1>;
};
