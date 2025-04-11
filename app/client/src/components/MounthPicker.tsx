import { MONTHS } from "@utils/constant";
import { FC, useEffect, useState } from "react";

interface Props {
  onChange: (d: any) => void;
}

const MounthPicker: FC<Props> = ({ onChange }) => {
  const now = new Date();
  const [iStart, setIsStart] = useState(true);
  const [data, setData] = useState({ s: now.getMonth(), e: now.getMonth() });

  useEffect(() => {
    const month = [];
    for (let i = data.s; i <= data.e; i++) {
      month.push(i);
    }
    onChange(month);
  }, [data.e]);
  return (
    <div className="grid grid-cols-7 justify-between gap-3">
      <button
        type="button"
        onClick={() => {
          setData({ s: 0, e: 11 });
        }}
        className={`rounded border border-slate-100 p-1 bg-slate-700 text-white w-ful text-base col-span-2 `}
      >
        Tous
      </button>
      {MONTHS.map((m, i) => {
        return (
          <button
            key={i}
            type="button"
            onClick={() => {
              if (iStart) {
                setData({ ...data, s: i, e: i });
              } else {
                setData({ ...data, e: Math.max(i, data.s) });
              }
              setIsStart(!iStart);
            }}
            className={`rounded border border-slate-100 p-2 bg-slate-50 w-full m-auto text-base ${
              i === data.s && "!bg-primary text-white"
            } ${i === data.e && "!bg-orange-400 text-white"} ${
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
