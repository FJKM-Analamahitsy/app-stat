import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MemberShema } from "@utils/schema";
import { FC } from "react";

interface MemberDetailsProps {
  data: any;
}

const MemberDetails: FC<MemberDetailsProps> = ({ data }) => {
  const icon: any = {
    user: <FontAwesomeIcon icon={solid("user")} size="sm" />,
    mail: <FontAwesomeIcon icon={solid("envelope")} size="sm" />,
    phone: <FontAwesomeIcon icon={solid("phone")} size="sm" />,
  };
  return (
    <div className="border border-bg p-2 px-4 rounded-[5px] min-w-[250px]">
      {Object.keys(data).map((el, i) => {
        return (
          <div className="my-2">
            <span className="text-gray-700">
              {icon[el] ? icon[el] : icon.user}
            </span>
            <span className="ml-2">{data[el]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MemberDetails;
