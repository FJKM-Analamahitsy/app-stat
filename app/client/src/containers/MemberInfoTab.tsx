import Select from "@components/Select";
import { useAppSelector } from "@redux/hooks";
import {
  Children,
  FC,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

const MemberInfoTab: FC<Props> = ({ children }) => {
  const user = useAppSelector((state) => state.user);
  const [active, setActive] = useState(0);
  const [tabPage, setTab] = useState<any>([]);

  const tab = [
    "Ny tena",
    "Ankohonana",
    "Adidy mpandray",
    "Adidy vita",
    "Presence",
  ];
  const child = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return child;
    }
  });

  useEffect(() => {
    const tab = [...user.profile.tabInPage];
    setActive(tab.sort()[0]);
    setTab(tab.sort());
  }, []);
  return (
    <div>
      <>
        {user._id && (
          <div className=" w-full border-b border-b-bg">
            <div className="hidden md:flex gap-4">
              {tabPage.map((t: number) => {
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
            <div className="w-full md:hidden">
              <Select
                options={tabPage.map((t: number) => tab[t])}
                valueIndex
                onChange={(e) => setActive(+e.target.value)}
              />
            </div>
          </div>
        )}
      </>
      <div className="">{child && child[active]}</div>
    </div>
  );
};

export default MemberInfoTab;
