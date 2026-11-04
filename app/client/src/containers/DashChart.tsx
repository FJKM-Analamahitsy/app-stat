import { FC, useMemo } from "react";
import { Bar } from "react-chartjs-2";
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
import { getData } from "@utils/api";
import useSWR from "swr";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  title: string;
}

const DashChart: FC<Props> = ({ title }) => {
  const { data } = useSWR("stat/perbirth", getData);
  const options = {
    responsive: true,
  };

  const chart = useMemo(() => {
    if (!data) return null;
    return {
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
  }, [data]);
  return (
    <div className="bg-white rounded-[5px] p-4 w-full">
      {chart && (
        <Bar options={options} data={chart} className="w-full h-full" />
      )}
    </div>
  );
};

export default DashChart;
