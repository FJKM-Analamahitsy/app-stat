import AvatarGroup from "@components/AvatarGroup";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getData } from "@utils/api";
import { FC } from "react";
import useSWR from "swr";

const Sampana: FC = () => {
  const { data } = useSWR("stat/pergroup", getData);

  return (
    <div className="bg-white p-4 rounded-[5px]">
      <div className="text-slate-600 mb-2">
        <FontAwesomeIcon icon={solid("users")} size="sm" />
        <span className="font-medium text-[18px] ml-2">Sampana</span>
      </div>

      <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
        {data &&
          Object.keys(data).map((sm, i) => {
            return (
              <div
                key={i}
                className="border border-slate-100 p-2 rounded-[4px] flex justify-between mb-4"
              >
                <div className="flex gap-2">
                  <div>
                    <p className="font-medium">{sm}</p>
                    <p className="text-primary text-[12px]">
                      {data[sm]} membre(s)
                    </p>
                  </div>
                </div>
                <div>
                  <AvatarGroup data={["mi", "er"]} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sampana;
