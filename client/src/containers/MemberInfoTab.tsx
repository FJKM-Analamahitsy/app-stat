import { FC, useState } from "react";
import AdidyDetails from "./AdidyDetails";

const MemberInfoTab: FC = () => {
  const [active, setActive] = useState(0);
  const tab = ["History", "Family", "Adidy"];
  return (
    <div>
      <div className="flex gap-4 w-full border-b border-b-bg">
        {tab.map((t, i) => {
          return (
            <div
              key={i}
              className={`p-2 cursor-pointer ${active === i && "bg-bg"}`}
              onClick={() => setActive(i)}
            >
              {t}
            </div>
          );
        })}
      </div>
      <div className="p-4">{active === 2 && <AdidyDetails />}</div>
    </div>
  );
};

export default MemberInfoTab;
