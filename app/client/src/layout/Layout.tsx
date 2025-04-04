import { FC } from "react";
import SideMenu from "./SideMenu";
import Header from "layout/Header";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <SideMenu />
      <div className="w-full">
        <Header />
        <div className="w-full h-[calc(100vh-70px)] overflow-hidden overflow-y-auto p-4 bg-slate-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
