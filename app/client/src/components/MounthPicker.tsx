import { MONTHS } from "@utils/constant";
import { FC, useEffect, useState } from "react";

const MounthPicker: FC = () => {
  const [iStart, setIsStart] = useState(true);
  const [data, setData] = useState({ s: 0, e: 0 });
  return (
    <div className="grid grid-cols-7 justify-between gap-3">
      <button
        onClick={() => {
          setData({ s: 0, e: 11 });
        }}
        className={`rounded border border-slate-100 p-2 bg-slate-700 text-white w-ful col-span-2 `}
      >
        Tous
      </button>
      {MONTHS.map((m, i) => {
        return (
          <button
            key={i}
            onClick={() => {
              if (iStart) {
                setData({ ...data, s: i });
              } else {
                setData({ ...data, e: Math.max(i, data.s) });
              }
              setIsStart(!iStart);
            }}
            className={`rounded border border-slate-100 p-2 bg-slate-50 w-full m-auto ${
              i === data.s && "!bg-primary text-white"
            } ${i === data.e && "!bg-blue-500 text-white"} ${
              i > data.s && i < data.e && "!bg-blue-100 text-slate-500"
            }`}
          >
            {m.slice(0, 3)}
          </button>
        );
      })}
    </div>
  );
};

export default MounthPicker;
