import ToggleTheme from "@/components/ToggleTheme";

interface PageLayoutProps {
  children: React.ReactNode;
}
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div id="tinyyard">
      <nav className="container fixed top-0 left-0 right-0 z-10 mx-auto h-nav py-4 px-6 flex items-center justify-between bg-brand rounded-b-lg">
        <h1 className="font-mono text-2xl font-bold text-white">
          <a href="/">tinyyard</a>
        </h1>
        <ToggleTheme />
      </nav>
      <main className="container mx-auto px-6 mt-nav py-10">{children}</main>
    </div>
  );
};

export default PageLayout;
