import Calendar from "@components/Calendar";
import DashChart from "@containers/DashChart";
import Sampana from "@containers/Sampana";
import Layout from "layout";
import { FC } from "react";

const Home: FC = () => {
  const data = [
    {
      label: "Lehilahy",
      n: 1254,
      p: 60,
    },
    {
      label: "Vehivavy",
      n: 624,
      p: 40,
    },
    {
      label: "Mpandray",
      n: 624,
      p: 40,
    },
    {
      label: "Batisa",
      n: 624,
      p: 40,
    },
  ];
  return (
    <Layout>
      <div className="bg-slate-50 h-full p-4">
        <div className="flex justify-between gap-4">
          <div className="grow">
            <div className="w-full grid grid-cols-2 gap-4 h-fit">
              {data.map((dp, i) => {
                return (
                  <div
                    key={i}
                    className={`${
                      i === 0 ? "bg-primary text-white" : "bg-white "
                    } p-2 w-full rounded-[5px] h-fit`}
                  >
                    <span
                      className={`font-medium text-sm ${
                        i === 0 ? "text-slate-50" : "text-slate-500"
                      }`}
                    >
                      {dp.label}
                    </span>
                    <div className="flex justify-between">
                      <span className="font-medium text-[2rem]">{dp.n}</span>
                      <div
                        className={`w-[40px] h-[40px] rounded-full flex justify-center items-center border-2 ${
                          i === 0
                            ? "border-white"
                            : "border-primary text-primary"
                        }`}
                      >
                        <span className="text-[12px] font-medium">{dp.p}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-1/3">
            <Calendar />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="grow">
            <DashChart />
          </div>
          <div className="w-1/3">
            <Sampana />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
