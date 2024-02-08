import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const BarChart = (props: any) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: props.label,
    datasets: [
      {
        label: props.title,
        data: props.data,
        backgroundColor: [
          "#47824a",
          "#26c6da",
          "#26a69a",
          "#67b7f7",
          "#ef5350",
          "#ff7043",
        ],
        borderColor: [
          "#47824a",
          "#26c6da",
          "#26a69a",
          "#67b7f7",
          "#ef5350",
          "#ff7043",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};

export default BarChart;
