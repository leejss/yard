import ToggleTheme from "@/components/ToggleTheme";

interface PageLayoutProps {
  children: React.ReactNode;
}
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div id="tinyyard">
      <nav className="fixed top-0 left-0 right-0 z-10 h-nav flex items-center justify-between bg-brand rounded-b-lg">
        <div className="container mx-auto h-full flex items-center justify-between px-2 py-4">
          <h1 className="font-mono text-2xl font-bold text-white">
            <a href="/">tinyyard</a>
          </h1>
          <ToggleTheme />
        </div>
      </nav>
      <main className="container mx-auto px-2 py-6 md:py-10 mt-nav">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
