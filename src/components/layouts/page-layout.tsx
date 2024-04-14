import SelectTheme from "@/components/select-theme";

interface PageLayoutProps {
  children: React.ReactNode;
}
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div id="tinyyard">
      <nav className="fixed left-0 right-0 top-0 z-10 flex h-nav items-center justify-between rounded-b-lg bg-brand">
        <header className="container mx-auto flex h-full items-center justify-between px-2">
          <h1 className="font-sans text-2xl font-bold text-black transition hover:text-white">
            <a href="/">tinyyard</a>
          </h1>
          <div className="flex items-center">
            <SelectTheme />
          </div>
        </header>
      </nav>
      <main className="container mx-auto mt-nav px-2 py-6 md:py-10">{children}</main>
    </div>
  );
};

export default PageLayout;
