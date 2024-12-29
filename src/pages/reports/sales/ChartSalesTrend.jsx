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

const ChartSalesTrend = ({ info, title, width }) => {
  const extractLabels = (info) => {
    return info
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .map((item) => {
        const date = getFromDate(item.created_at);
        return `${date.month_name} ${date.d}`;
      });
  };

  const data = {
    labels: extractLabels(info),
    datasets: [
      {
        label: title,
        data: info.map((item) => item.total_price),
        fill: false,
        borderColor: '#36a2eb', // Line color
        tension: 0.1,
      },
    ],
  };

  return (
    <Box
      sx={{
        width,
        padding: 2,
        margin: '1rem',
        aspectRatio: 16 / 9,
        borderRadius: 1,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        outline: 'solid 1px #dedede',
      }}
    >
      <Line data={data} />
    </Box>
  );
};

ChartSalesTrend.propTypes = {
  sales_trend: PropTypes.array.isRequired,
  info: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default ChartSalesTrend;
