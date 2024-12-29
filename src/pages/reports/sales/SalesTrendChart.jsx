import { Bar } from 'react-chartjs-2'; // Import the Bar chart component from react-chartjs-2
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getFromDate } from '../../../utils/getFromDate';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesTrendChart = ({ sales_trend }) => {
  const headers = sales_trend?.map((item) => {
    const weekday = getFromDate(item.date).weekday;
    const day = getFromDate(item.date).day;
    return `${weekday} ${day}`;
  });
  const info = sales_trend?.map((item) => item.total_sales) || [];

  console.log(headers, info);
  const data = {
    labels: headers,
    datasets: [
      {
        label: getFromDate(sales_trend[0].date).month,
        data: info,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

SalesTrendChart.propTypes = {
  sales_trend: PropTypes.array.isRequired,
};

export default SalesTrendChart;
