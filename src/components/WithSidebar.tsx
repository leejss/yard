import type { PropsWithChildren } from "react";

const WithSidebar = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen">
      <div className="h-full fixed top-0 left-0 bg-slate-500 w-[300px]"></div>
      <main className="h-full ml-[300px] p-3">
        <div className="h-full rounded bg-red-100">
          <div className="h-[72px] bg-black py-4">hello</div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default WithSidebar;
