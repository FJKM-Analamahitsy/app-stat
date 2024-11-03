import { useAppSelector } from "@redux/hooks";
import { Children, FC, isValidElement, ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

const MemberInfoTab: FC<Props> = ({ children }) => {
  const user = useAppSelector((state) => state.user);
  const [active, setActive] = useState(user.profile.tabInPage.sort()[0]);

  const tab = ["Ny tena", "Ankohonana", "Adidy mpandray", "Adidy samihafa"];
  const child = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return child;
    }
  });
  return (
    <div>
      <div className="flex gap-4 w-full border-b border-b-bg">
        {user.profile.tabInPage.sort().map((t: number) => {
          return (
            <div
              key={t}
              className={`p-2 cursor-pointer ${active === t && "bg-bg"}`}
              onClick={() => setActive(t)}
            >
              {tab[t]}
            </div>
          );
        })}
      </div>
      <div className="">{child && child[active]}</div>
    </div>
  );
};

export default MemberInfoTab;
