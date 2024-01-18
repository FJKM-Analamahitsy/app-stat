import { FC } from "react";

interface AvatarProps {
  img?: string;
  label?: string;
  size?: number;
  reversed?: boolean;
  hideLabSm?: boolean;
}

const Avatar: FC<AvatarProps> = ({
  img,
  label,
  size = 40,
  reversed = false,
  hideLabSm = false,
}) => {
  const name = label?.split(" ");
  return (
    <div
      className={`flex items-center ${label && "gap-[16px]"} ${
        reversed && "flex-row-reverse"
      }`}
    >
      <div
        className="rounded-full bg-bg flex justify-center items-center cursor-pointer overflow-hidden"
        style={{ width: size, height: size }}
      >
        {img && <img src={img} alt="" className="w-full h-full" />}
        {name && (
          <span className="font-medium text-grey uppercase">
            {name[0][0] + name[0][1]}
          </span>
        )}
      </div>
      {name && (
        <div className={`${hideLabSm && "hidden sm:block"}`}>
          <p className={`leading-[1.1] ${reversed && "text-right"}`}>
            <span className="font-semibold">{name[0]}</span>
            <br />
            <span>{name.slice(1).join(" ")}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Avatar;
