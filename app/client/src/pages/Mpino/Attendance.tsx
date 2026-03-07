import { getData } from "@utils/api";
import dayjs from "dayjs";
import { FC } from "react";
import useSWR from "swr";

interface Props {
  id: string;
}

const Attendance: FC<Props> = ({ id }) => {
  const { data = [] } = useSWR(id ? `attendance?member=${id}` : null, getData);
  const { data: count } = useSWR(id ? `attendance/count` : null, getData);

  return (
    <div className="pt-4">
      <div className="bg-primary w-fit text-white rounded px-3 p-2">
        {count} | {data.length}
      </div>
      <div className="max-w-[300px] w-fit">
        {data.map((d: any, i: number) => {
          return (
            <div className="flex gap-3 p-2 py-3 border-b border-slate-100">
              <p className="w-10">{i + 1}</p>
              <p>{dayjs(d.createdAt).format("DD, MMM YYYY à HH:mm")}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Attendance;
