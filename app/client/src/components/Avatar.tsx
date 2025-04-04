import { FC } from "react";

interface AvatarProps {
  img?: string;
  label?: string;
  size?: number;
  textSize?: number;
  reversed?: boolean;
  hideLabSm?: boolean;
  hideLabel?: boolean;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({
  img,
  label,
  size = 40,
  reversed = false,
  hideLabSm = false,
  hideLabel = false,
  textSize = 16,
  className = "border-white",
}) => {
  const name = label?.split(" ");
  return (
    <div
      className={`flex items-center ${label && "gap-[16px]"} ${
        reversed && "flex-row-reverse"
      }`}
    >
      <div
        className={`rounded-full bg-bg flex border-2 justify-center items-center cursor-pointer overflow-hidden ${className}`}
        style={{ width: size, height: size, minWidth: size }}
      >
        {img && <img src={img} alt="" className="w-full h-full" />}
        {name && (
          <span
            style={{ fontSize: textSize }}
            className="font-medium text-grey uppercase"
          >
            {name[0][0] + name[0][1]}
          </span>
        )}
      </div>
      {name && !hideLabel && (
        <div className={`${hideLabSm && "hidden sm:block"}`}>
          <p
            className={`leading-[1.3] overflow-ellipsis ${
              reversed && "text-right"
            }`}
          >
            <span className="font-semibold truncate uppercase">{name[0]}</span>
            <br />
            <span className="block truncate w-full">
              {name.slice(1).join(" ")}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Avatar;
