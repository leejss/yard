import PageNav from "./PageNav";

interface PageLayoutProps {
  children: React.ReactNode;
}
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div id="tinyyard">
      <PageNav />
      <main className="container mx-auto mt-nav h-[2000px] px-2 py-6 md:py-10">{children}</main>
    </div>
  );
};

export default PageLayout;
