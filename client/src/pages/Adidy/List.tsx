import Compta from "@containers/Compta";
import { FC } from "react";

const Journal: FC = () => {
  return (
    <div className="h-full bg-white">
      <Compta className="h-[calc(100vh-280px)] md:h-[calc(100vh-250px)] !overflow-y-auto" />
    </div>
  );
};

export default Journal;
