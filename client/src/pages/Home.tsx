import Calendar from "@components/Calendar";
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
          <div className="grow grid grid-cols-3 gap-4">
            {data.map((dp, i) => {
              return (
                <div key={i} className="bg-white p-2 w-full rounded-sm h-fit">
                  <span className="font-medium text-sm text-slate-500">
                    {dp.label}
                  </span>
                  <div className="flex justify-between">
                    <span className="font-medium text-[2rem]">{dp.n}</span>
                    <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center border-[2px] border-primary">
                      <span className="text-[12px] text-primary font-medium">
                        {dp.p}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-1/3">
            <Calendar />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
