import Avatar from "@components/Avatar";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "@redux/hooks";
import { formatMoney } from "@utils/helper";
import { FC } from "react";

const Header: FC = () => {
  const { fullname } = useAppSelector((state) => state.user);
  const summary = useAppSelector((state) => state.summary);

  return (
    <div className="w-full h-[70px] border-b flex items-center p-5 justify-between">
      <div className="ml-11 lg:ml-0">
        {summary.count > 0 && (
          <p className="text-lg font-medium">
            {summary.count} - {formatMoney(summary.sum)} MGA
          </p>
        )}
      </div>

      <div className="flex items-center gap-8">
        <Avatar label={fullname} reversed hideLabSm />
      </div>
    </div>
  );
};

export default Header;
