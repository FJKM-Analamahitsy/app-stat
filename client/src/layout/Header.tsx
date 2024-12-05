import Avatar from "@components/Avatar";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "@redux/hooks";
import { FC } from "react";
import { isMobile } from "react-device-detect";

const Header: FC = () => {
  const { username } = useAppSelector((state) => state.user);
  return (
    <div className="w-full h-[70px] border-b flex items-center p-5 justify-between">
      <div className=""></div>

      <div className="flex items-center gap-8">
        <div className="relative animate-pulse">
          <FontAwesomeIcon
            icon={isMobile ? solid("mobile") : solid("laptop")}
            color="#A4B4BD"
            size="lg"
          />
        </div>
        <Avatar label={username} reversed hideLabSm />
      </div>
    </div>
  );
};

export default Header;
