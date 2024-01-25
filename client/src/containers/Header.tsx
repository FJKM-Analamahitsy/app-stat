import Avatar from "@components/Avatar";
import Search from "@components/Search";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const Header: FC = () => {
  const user = sessionStorage.getItem("user") || "";
  return (
    <div className="w-full h-[70px] border-b flex items-center p-5 justify-between">
      <div className="sm:hidden"></div>
      <div className="w-1/3 hidden sm:block">
        <Search />
      </div>

      <div className="flex items-center gap-8">
        <div className="relative">
          <FontAwesomeIcon icon={regular("bell")} color="#A4B4BD" size="lg" />
          <div className="w-[12px] h-[12px] rounded-full bg-red-500 text-white text-[10px] flex justify-center items-center p-1 absolute top-0 left-[9px]">
            2
          </div>
        </div>
        <Avatar label={user} reversed hideLabSm />
      </div>
    </div>
  );
};

export default Header;
