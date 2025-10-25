import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  labels: string[];
  datasets: any[];
}

const DoghnutChart: FC<Props> = ({ labels, datasets }) => {
  const options = {
    responsive: true,
  };

  const chart = {
    labels,
    datasets,
  };
  return <Doughnut options={options} data={chart} className="w-full h-full" />;
};

export default DoghnutChart;
