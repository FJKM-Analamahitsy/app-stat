import Calendar from "@components/Calendar";
import DashChart from "@containers/DashChart";
import Sampana from "@containers/Sampana";
import { FC, useEffect, useState } from "react";
import map from "@assets/img/world-map.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import api from "@utils/api";

const Home: FC = () => {
  const [data, setData] = useState<any>();
  const hdata = ["lehilahy", "vehivavy", "mpandray", "batisa"];
  const faritra = ["avaratra", "atsinanana", "atsimo", "andrefana"];

  useEffect(() => {
    api.get("/member/stat").then((res) => setData(res.data));
  }, []);
  return (
    <div className="bg-slate-50 h-fit p-4">
      <div className="bg-no-repeat bg-cover rounded-[1rem] bg-white p-4 bg-line-pattern">
        <div>
          <p className="text-[1.5rem] font-medium">FJKM Analamahitsy</p>
          <p className="text-slate-500">SP19 Iarivo Avaradrano</p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-fit mt-4">
          {data &&
            hdata.map((dp, i) => {
              if (data[dp]) {
                return (
                  <div
                    key={i}
                    className={`${
                      i === 0 ? "bg-primary text-white" : "bg-white "
                    } p-2 w-full rounded-[5px] h-fit shadow-md`}
                  >
                    <span
                      className={`capitalize font-medium text-sm ${
                        i === 0 ? "text-slate-50" : "text-slate-500"
                      }`}
                    >
                      {dp}
                    </span>
                    <div className="flex justify-between">
                      <span className="font-medium text-[2rem]">
                        {data[dp].n}
                      </span>
                      <div
                        className={`w-[40px] h-[40px] rounded-full flex justify-center items-center border-2 ${
                          i === 0
                            ? "border-white"
                            : "border-primary text-primary"
                        }`}
                      >
                        <span className="text-[12px] font-medium">
                          {data[dp].p}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="col-span-2 bg-white rounded-[5px] p-2 h-fit flex flex-col items-center">
          <DashChart title={`${data && data.total} Christians`} />
          <div className="flex overflow-auto w-full p-4  gap-4 mt-2 [&>*:nth-child(1)]:text-primary [&>*:nth-child(2)]:text-green-500 [&>*:nth-child(3)]:text-red-500 [&>*:nth-child(4)]:text-purple-500">
            {data &&
              faritra.map((fr, i) => {
                if (data[fr]) {
                  return (
                    <div key={i} className="flex items-center">
                      <FontAwesomeIcon icon={solid("circle-dot")} />
                      <span className="ml-2 capitalize text-slate-600 whitespace-nowrap">
                        {fr} {data[fr].n} ({data[fr].p}%)
                      </span>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
        <Sampana />
      </div>
    </div>
  );
};

export default Home;
