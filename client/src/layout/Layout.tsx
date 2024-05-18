import { FC, ReactNode } from "react";
import SideMenu from "./SideMenu";
import Header from "@containers/Header";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <SideMenu />
      <div className="w-full">
        <Header />
        <div className="w-full h-[calc(100vh-70px)] overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
