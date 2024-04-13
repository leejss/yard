interface TitleProps {
  children: string;
}

export const Title = ({ children }: TitleProps) => {
  return (
    <>
      <div className="flex items-center">
        <h1 className="container mx-auto px-4 font-bold text-3xl md:text-5xl text-emerald-700 dark:text-emerald-500">{children}</h1>
      </div>
      <div className="h-[2px] bg-emerald-500 my-4" />
    </>
  );
};
