import { FC } from "react";

const Skeleton: FC = () => {
  return (
    <div className="w-full h-full bg-white p-4 flex flex-col gap-6">
      <div className="flex justify-between h-12">
        <div className="w-1/3 h-full bg-gray-100 rounded animate-pulse" />
        <div className="w-1/4 h-full bg-gray-100 rounded animate-pulse" />
      </div>
      <div className="grid grid-rows-5 gap-2 grow">
        <div className="w-full h-full bg-gray-100 rounded animate-pulse" />
        <div className="w-full h-full bg-gray-100 rounded animate-pulse" />
        <div className="w-full h-full bg-gray-100 rounded animate-pulse" />
      </div>
      <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
    </div>
  );
};

export default Skeleton;
