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

// prettier-ignore
ChartJS.register(
	CategoryScale,  LinearScale,  BarElement,  LineElement,  PointElement,  Title,  Tooltip,  Legend);

// ChartSalesTrend
const ChartSalesTrend = ({ info, sx }) => {
  const extractLabels = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 'cook'];
  };

  const arrDataset = {};

  for (let i = 0; i < info.length; i++) {
    const item = info[i];
    const month = getFromDate(item.created_at).month_name;
    const color = getRandomColor();
    const borderColor = hexToRGBA(color, 0.5);
    const bgColor = hexToRGBA(color, 0.2);

    const price = parseFloat(item.price) * item.quantity;

    if (!arrDataset[month]) {
      arrDataset[month] = {
        label: month,
        month_number: getFromDate(item.created_at).m,
        fill: false,
        data: [price],
        tension: 0,
        borderColor: borderColor,
        backgroundColor: bgColor,
      };
    } else {
      arrDataset[month].data.push(price);
    }
  }

  // create an array of the objects inside arrDataset, sorted by month_number
  const arrDatasetSortedByMonth = Object.keys(arrDataset)
    .sort((a, b) => arrDataset[a].month_number - arrDataset[b].month_number)
    .map((key) => arrDataset[key]);

  const data = {
    Title: 'ventas del mes',
    labels: extractLabels(info),
    datasets: Object.values(arrDatasetSortedByMonth),
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
  info: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  sx: PropTypes.object.isRequired,
};

export default ChartSalesTrend;
