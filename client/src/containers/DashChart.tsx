import { FC, useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import api from "@utils/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  title: string;
}

const DashChart: FC<Props> = ({ title }) => {
  const [data, setData] = useState({});
  const options = {
    responsive: true,
  };

  const chart = {
    labels: Object.keys(data).map((v) => v.slice(0, 3)),
    datasets: [
      {
        label: title,
        data: Object.values(data),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.7)",
      },
    ],
  };
  useEffect(() => {
    api.get("/member/stat/monthly").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div className="bg-white rounded-[5px] p-4 w-full">
      <Bar options={options} data={chart} className="w-full h-full" />
    </div>
  );
};

export default DashChart;
