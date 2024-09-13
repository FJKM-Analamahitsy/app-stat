import { Children, FC, isValidElement, ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

const MemberInfoTab: FC<Props> = ({ children }) => {
  const [active, setActive] = useState(0);
  const tab = ["Ankohonana", "Adidy"];
  const child = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return child;
    }
  });
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
      <div className="p-4">{child && child[active]}</div>
    </div>
  );
};

export default MemberInfoTab;
