import { FC, ReactNode } from "react";
import SideMenu from "@containers/SideMenu";
import Header from "@containers/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex">
      <div>
        <SideMenu />
      </div>
      <div className="w-full">
        <Header />
        <div className="w-full h-[calc(100vh-70px)]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
