import { MONTHS } from "@utils/constant";
import { FC, useState } from "react";

const AdidyDetails: FC = () => {
  const years = useState([
    ...Array.from(Array(3).keys()).map((i) =>
      (new Date().getFullYear() - i).toString()
    ),
  ])[0];
  return (
    <div className="overflow-x-auto py-2">
      <div className="grid grid-cols-[repeat(13,minmax(40px,1fr))] gap-2 items-center">
        <div className="sticky left-0 bg-white text-white">.</div>
        {MONTHS.map((m, i) => {
          return (
            <div key={i} className="text-ellipsis overflow-hidden m-auto">
              {m.slice(0, 3)}
            </div>
          );
        })}
      </div>
      {years.map((yrs, i) => {
        return (
          <div
            key={i}
            className="grid grid-cols-[repeat(13,minmax(40px,1fr))] gap-2 items-center"
          >
            <div className="sticky left-0 bg-white">{yrs}</div>
            {Array.from(Array(12).keys()).map((i) => {
              return (
                <div
                  key={i}
                  className="w-[12px] h-[12px] bg-primary m-auto rounded-[2px]"
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AdidyDetails;
