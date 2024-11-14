import api from "@utils/api";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Select from "@components/Select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartAdidy: FC = () => {
  const now = useState(new Date())[0];
  const [data, setData] = useState<any>([]);
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const chart = {
    labels: data.map((v: any) => dayjs(v._id.date).format("DD-MM")),
    datasets: [
      {
        label: "chretien",
        data: data.map((v: any) => v.count),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.7)",
        tension: 0.5,
      },
    ],
  };

  const chartMtt = {
    labels: data.map((v: any) => dayjs(v._id.date).format("DD-MM")),
    datasets: [
      {
        label: "Montant",
        data: data.map((v: any) => v.sum),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.7)",
        tension: 0.5,
      },
    ],
  };
  useEffect(() => {
    api.get(`/adidy/summary/annualy?year=${year}`).then((res) => {
      setData(res.data);
    });
  }, [year]);
  return (
    <div className="bg-white rounded p-4">
      <div className="flex justify-between">
        <p className="font-medium text-lg">Adidy</p>
        <div>
          <Select
            value={data.year}
            onChange={(e) => setYear(e.target.value)}
            options={[
              ...Array.from(Array(4).keys()).map((i) =>
                (now.getFullYear() - i).toString()
              ),
            ]}
            valueIndex={false}
          />
        </div>
      </div>
      <div className=" grid grid-cols-2">
        <div className="">
          <Line data={chart} options={{ responsive: true }} />
        </div>
        <div>
          <Line data={chartMtt} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default ChartAdidy;
