import Avatar from "@components/Avatar";
import Input from "@components/Input";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collapseAction } from "@redux/actions";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { FC } from "react";

const Header: FC = () => {
  const collapse = useAppSelector((state) => state.collapse);
  const dispatch = useAppDispatch();
  return (
    <div className="w-full h-[70px] border-b flex items-center p-5 justify-between">
      <div className="flex">
        <FontAwesomeIcon
          icon={solid("bars")}
          className="text-grey"
          onClick={() => dispatch(collapseAction(!collapse))}
        />
        <div className="w-1/3 hidden sm:block">
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
      </div>

      <div className="flex items-center gap-8">
        <div className="relative">
          <FontAwesomeIcon icon={regular("bell")} color="#A4B4BD" size="lg" />
          <div className="w-[12px] h-[12px] rounded-full bg-red-500 text-white text-[10px] flex justify-center items-center p-1 absolute top-0 left-[9px]">
            2
          </div>
        </div>
        <Avatar label="Andrianarijaona Tojonirina" reversed />
      </div>
    </div>
  );
};

export default Header;
