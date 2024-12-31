import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Box } from '@mui/material';
import { getFromDate } from '../../../utils/getFromDate';
import { getRandomColor, hexToRGBA } from '../../../utils/colors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ChartSalesTrend = ({ info, sx }) => {
  const extractLabels = (info = []) => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  };

  const arrDataset = {};

  for (let i = 0; i < info.length; i++) {
    const item = info[i];
    const month = getFromDate(item.created_at).month_name;
    const day = getFromDate(item.created_at).day_number;
    const color = getRandomColor();
    const borderColor = hexToRGBA(color, 0.5);
    const bgColor = hexToRGBA(color, 0.2);

    if (!arrDataset[month]) {
      arrDataset[month] = {
        label: month,
        fill: false,
        data: [item.total_price],
        tension: 0.1,
        borderColor: borderColor,
        backgroundColor: bgColor,
      };
    } else {
      arrDataset[month].data.push(item.total_price);
    }
  }

  console.log(arrDataset);
  const data = {
    Title: 'ventas del mes',
    labels: extractLabels(info),
    datasets: Object.values(arrDataset),
  };

  const options = {
    mantainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Tendencia de ventas por mes',
      },
    },
  };

  return (
    <Box
      sx={{
        padding: 2,
        margin: '1rem',
        aspectRatio: 16 / 9,
        borderRadius: 1,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        outline: 'solid 1px #dedede',
        ...sx,
      }}
    >
      <Line data={data} options={options} />
    </Box>
  );
};

ChartSalesTrend.propTypes = {
  sales_trend: PropTypes.array.isRequired,
  info: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  sx: PropTypes.object.isRequired,
};

export default ChartSalesTrend;
