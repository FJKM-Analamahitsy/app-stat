import Calendar from "@components/Calendar";
import DashChart from "@containers/DashChart";
import Sampana from "@containers/Sampana";
import Layout from "layout";
import { FC } from "react";
import bg from "@assets/img/bg.svg";
import map from "@assets/img/world-map.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

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
        <div
          className="bg-no-repeat bg-cover rounded-[1rem] bg-white p-4"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div>
            <p className="text-[1.5rem] font-medium">FJKM Analamahitsy</p>
            <p className="text-slate-500">SPIA 19</p>
          </div>
          <div className="w-full grid grid-cols-4 gap-4 h-fit mt-4">
            {data.map((dp, i) => {
              return (
                <div
                  key={i}
                  className={`${
                    i === 0 ? "bg-primary text-white" : "bg-white "
                  } p-2 w-full rounded-[5px] h-fit shadow-md`}
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
                        i === 0 ? "border-white" : "border-primary text-primary"
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
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <DashChart />
              <DashChart />
              <div className="col-span-2 bg-white rounded-[5px] p-2 flex flex-col items-center">
                <img src={map} alt="" className="w-10/12" />
                <div className="flex gap-4 mt-2">
                  <div>
                    <FontAwesomeIcon
                      icon={solid("circle-dot")}
                      className="text-primary"
                    />
                    <span className="ml-2">Avaratra 125 (80%)</span>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={solid("circle-dot")}
                      className="text-green-500"
                    />
                    <span className="ml-2">Atsinanana 125 (80%)</span>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={solid("circle-dot")}
                      className="text-red-500"
                    />
                    <span className="ml-2">Atsimo 125 (80%)</span>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={solid("circle-dot")}
                      className="text-purple-500"
                    />
                    <span className="ml-2">Andrefana 125 (80%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Calendar />
            <div className="mt-4">
              <Sampana />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
