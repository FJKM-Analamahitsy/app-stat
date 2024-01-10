import { FC, useState } from "react";

const MemberInfoTab: FC = () => {
  const [active, setActive] = useState("History");
  const tab = ["History", "Family", "Adidy"];
  return (
    <div>
      <div className="flex gap-4 w-full border-b border-b-bg">
        {tab.map((t, i) => {
          return (
            <div
              key={i}
              className={`p-2 cursor-pointer ${active === t && "bg-bg"}`}
              onClick={() => setActive(t)}
            >
              {t}
            </div>
          );
        })}
      </div>
      <div>{active}</div>
    </div>
  );
};

export default MemberInfoTab;
