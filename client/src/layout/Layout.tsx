import { FC, ReactNode } from "react";
import SideMenu from "@containers/SideMenu";
import Header from "@containers/Header";
import { Navigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const token = sessionStorage.getItem("token");
  return (
    <>
      {token ? (
        <div className="w-screen h-screen flex overflow-hidden">
          <SideMenu />
          <div className="w-full">
            <Header />
            <div className="w-full h-[calc(100vh-70px)] overflow-y-auto overflow-x-hidden">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Layout;
