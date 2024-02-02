import AvatarGroup from "@components/AvatarGroup";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const Sampana: FC = () => {
  return (
    <div className="bg-white p-4 rounded-[5px]">
      <div className="text-slate-600 mb-2">
        <FontAwesomeIcon icon={solid("users")} size="sm" />
        <span className="font-medium text-[18px] ml-2">Sampana</span>
      </div>

      <div className="border border-slate-100 p-2 rounded-[4px] flex justify-between">
        <div className="flex gap-2">
          <div className="border-r-2 px-1">logo</div>
          <div>
            <p className="font-medium">AFA</p>
            <p className="text-primary text-[12px]">125 membre</p>
          </div>
        </div>
        <div>
          <AvatarGroup data={["tojo", "mimi", "avotra"]} />
        </div>
      </div>
    </div>
  );
};

export default Sampana;
