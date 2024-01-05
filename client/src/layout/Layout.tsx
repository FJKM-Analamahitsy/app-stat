import Input from "@components/Input";
import Logo from "@components/Logo";
import { FC, ReactNode } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex">
      <div>
        <Sidebar className="h-full !border-0">
          <div>
            <Logo />
          </div>
          <Menu>
            <MenuItem>Home</MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <div className="w-full">
        <div className="w-full h-[70px] border-b flex items-center p-5">
          <Input />
        </div>
        <div>body</div>
      </div>
    </div>
  );
};

export default Layout;
