import { FC } from "react";
import Avatar from "./Avatar";

interface AvatarGroupProps {
  data: string[];
}

const AvatarGroup: FC<AvatarGroupProps> = ({ data }) => {
  return (
    <div className="flex">
      {data.map((d, i) => {
        return (
          <div className={`${i > 0 && "ml-[-0.9rem]"}`}>
            <Avatar label={d} hideLabel />
          </div>
        );
      })}
    </div>
  );
};

export default AvatarGroup;
