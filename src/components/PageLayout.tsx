import ToggleTheme from "@/components/ToggleTheme";

interface PageLayoutProps {
  children: React.ReactNode;
}
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div>
      <nav className="h-nav py-4 px-6 flex items-center justify-between bg-background text-foreground">
        <h1 className="font-mono text-2xl">tinyyard</h1>
        <div>
          <ToggleTheme />
        </div>
      </nav>
      {children}
    </div>
  );
};

export default PageLayout;
