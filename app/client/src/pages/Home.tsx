import DashChart from "@containers/DashChart";
import Sampana from "@containers/Sampana";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { getData } from "@utils/api";
import ChartAdidy from "@containers/ChartAdidy";
import DoghnutChart from "@containers/DoghnutChart";
import { formatMoney, formatPercent } from "@utils/helper";
import useSWR from "swr";

interface SummaryProps {
  title: string;
  highlight?: boolean;
  stat: number;
  total?: number;
}

const SummaryItem: FC<SummaryProps> = ({
  title,
  stat,
  highlight = false,
  total,
}) => {
  return (
    <div
      className={`${
        highlight ? "bg-primary text-white" : "bg-white "
      } p-2 w-full rounded-[5px] h-fit shadow-md`}
    >
      <span
        className={`capitalize font-medium text-sm ${
          highlight ? "text-slate-50" : "text-slate-500"
        }`}
      >
        {title}
      </span>
      <div className="flex justify-between">
        <span className="font-medium text-[2rem]">{stat}</span>
        {total && (
          <div
            className={`w-[40px] h-[40px] rounded-full flex justify-center items-center border-2 ${
              highlight ? "border-white" : "border-primary text-primary"
            }`}
          >
            <span className="text-[12px] font-medium">
              {formatPercent(stat, total)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const Home: FC = () => {
  const { data } = useSWR("stat", getData);
  const faritra = ["avaratra", "atsinanana", "atsimo", "andrefana"];

  return (
    <>
      {data && (
        <div className="bg-slate-50 h-fit p-4">
          <div className="bg-no-repeat bg-cover rounded-[1rem] bg-white p-4 bg-line-pattern">
            <div>
              <p className="text-[1.5rem] font-medium">FJKM Analamahitsy</p>
              <p className="text-slate-500">SP19 Iarivo Avaradrano</p>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-fit mt-4">
              {data && (
                <>
                  <SummaryItem
                    title="Kristianina"
                    stat={data.total}
                    highlight
                  />
                  <SummaryItem title="Ankohonana" stat={data.home} />
                  <SummaryItem
                    title="Mpandray"
                    stat={data.mpandray}
                    total={data.total}
                  />
                  <SummaryItem
                    title="Batisa"
                    stat={data.batisa}
                    total={data.total}
                  />
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-6">
            <div className="p-2 bg-white rounded">
              <p>L/V</p>
              <DoghnutChart
                labels={["Lehilahy", "Vehivavy", "-"]}
                datasets={[
                  {
                    data: [
                      data.gender.lehilahy,
                      data.gender.vehivavy,
                      data.gender.null,
                    ],
                    backgroundColor: [
                      "rgba(53, 162, 235, 1)",
                      "rgba(53, 162, 235, 0.5)",
                      "rgba(53, 162, 235, 0.2)",
                    ],
                  },
                ]}
              />
              <div className="mt-3">
                <p>
                  <span className="font-medium">Lehilahy:</span>{" "}
                  {formatMoney(data.gender.lehilahy)} ~{" "}
                  {formatPercent(data.gender.lehilahy, data.total)}%
                </p>
                <p>
                  <span className="font-medium">Vehivavy:</span>{" "}
                  {formatMoney(data.gender.vehivavy)} ~{" "}
                  {formatPercent(data.gender.vehivavy, data.total)}%
                </p>
              </div>
            </div>
            <div className="p-2 bg-white rounded">
              <p>Mpandray</p>
              <DoghnutChart
                labels={["RAD", "Zanaka", "Hafa"]}
                datasets={[
                  {
                    data: [
                      data.mpandray_categ_1,
                      data.mpandray_categ_2,
                      data.mpandray_categ_3,
                    ],
                    backgroundColor: [
                      "rgba(53, 162, 235, 1)",
                      "rgba(53, 162, 235, 0.5)",
                      "rgba(53, 162, 235, 0.2)",
                    ],
                  },
                ]}
              />
              <div className="mt-3">
                <p>
                  <span className="font-medium">RAD:</span>{" "}
                  {formatMoney(data.mpandray_categ_1)} ~{" "}
                  {formatPercent(data.mpandray_categ_1, data.mpandray)}%
                </p>
                <p>
                  <span className="font-medium">Zanaka:</span>{" "}
                  {formatMoney(data.mpandray_categ_2)} ~{" "}
                  {formatPercent(data.mpandray_categ_2, data.mpandray)}%
                </p>
                <p>
                  <span className="font-medium">Hafa:</span>{" "}
                  {formatMoney(data.mpandray_categ_3)} ~{" "}
                  {formatPercent(data.mpandray_categ_3, data.mpandray)}%
                </p>
              </div>
            </div>
            <div className="p-2 bg-white rounded">
              <p>Recensement</p>
              <DoghnutChart
                labels={["Resencer", "Non recenser"]}
                datasets={[
                  {
                    data: [data.registered, data.total - data.registered],
                    backgroundColor: [
                      "rgba(53, 162, 235, 1)",
                      "rgba(53, 162, 235, 0.5)",
                    ],
                  },
                ]}
              />
              <div className="mt-3">
                <p>
                  <span className="font-medium">Resencer:</span>{" "}
                  {formatMoney(data.registered)} ~{" "}
                  {formatPercent(data.registered, data.total)}%
                </p>
                <p>
                  <span className="font-medium">Non recenser:</span>{" "}
                  {formatMoney(data.total - data.registered)} ~{" "}
                  {formatPercent(data.total - data.registered, data.total)}%
                </p>
                <p>
                  <span className="font-medium">Ondry:</span>{" "}
                  {formatMoney(data.sheep)} ~{" "}
                  {formatPercent(data.sheep, data.total)}%
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="col-span-2 bg-white rounded-[5px] p-2 h-fit flex flex-col items-center">
              <DashChart title={`Chretiens`} />
              <div className="flex overflow-auto w-full p-4  gap-4 mt-2 [&>*:nth-child(1)]:text-primary [&>*:nth-child(2)]:text-green-500 [&>*:nth-child(3)]:text-red-500 [&>*:nth-child(4)]:text-purple-500">
                {data &&
                  faritra.map((fr, i) => {
                    if (data.region[fr]) {
                      return (
                        <div key={i} className="flex items-center">
                          <FontAwesomeIcon icon={solid("circle-dot")} />
                          <span className="ml-2 capitalize text-slate-600 whitespace-nowrap">
                            {fr} {data.region[fr]} (
                            {formatPercent(data.region[fr], data.total)}%)
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
          <div className="mt-4">
            <ChartAdidy />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
