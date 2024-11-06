import { MONTHS } from "@utils/constant";
import { FC } from "react";

interface Props {
  data: any[];
}

const AdidyDetails: FC<Props> = ({ data }) => {
  return (
    <div className="p-4">
      <div className="overflow-x-auto py-2">
        <div className="grid grid-cols-[repeat(13,minmax(40px,1fr))] gap-1 items-center">
          <div className="sticky left-0 bg-white text-white">.</div>
          {MONTHS.map((m, i) => {
            return (
              <div key={i} className="text-ellipsis overflow-hidden m-auto">
                {m.slice(0, 3)}
              </div>
            );
          })}
        </div>
        {data.map((dt, i) => {
          return (
            <div
              key={i}
              className="grid grid-cols-[repeat(13,minmax(40px,1fr))] gap-1 my-4 items-center"
            >
              <div className="sticky left-0 bg-white">{dt.year}</div>
              {Array.from(Array(12).keys()).map((i) => {
                const isPayed = dt.month.indexOf(i) !== -1;
                return (
                  <div
                    key={i}
                    className={`w-6 aspect-square ${
                      isPayed ? "bg-primary" : "bg-slate-100"
                    } m-auto rounded-[2px]`}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdidyDetails;
