import Input from "@components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FC, ReactNode } from "react";
import Avatar from "@components/Avatar";
import SideMenu from "@containers/SideMenu";

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
        <div className="w-full h-[70px] border-b flex items-center p-5 justify-between">
          <div className="w-1/3">
            <Input
              leftIcon={
                <FontAwesomeIcon
                  icon={solid("magnifying-glass")}
                  color="#909090"
                  size="sm"
                />
              }
              placeholder="search"
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="relative">
              <FontAwesomeIcon
                icon={regular("bell")}
                color="#A4B4BD"
                size="lg"
              />
              <div className="w-[12px] h-[12px] rounded-full bg-red-500 text-white text-[10px] flex justify-center items-center p-1 absolute top-0 left-[9px]">
                2
              </div>
            </div>
            <Avatar label="Andrianarijaona Tojonirina" reversed />
          </div>
        </div>
        <div>body</div>
      </div>
    </div>
  );
};

export default Layout;
