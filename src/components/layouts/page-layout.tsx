import PageNav from "./PageNav";

interface PageLayoutProps {
  children: React.ReactNode;
}
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div>
      <PageNav />
      <main className="mx-auto w-full max-w-[--page-width]">{children}</main>
    </div>
  );
};

export default PageLayout;
