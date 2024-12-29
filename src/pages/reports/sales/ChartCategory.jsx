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
import { Box } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartCategory = ({ info, title, width }) => {
  const data = {
    labels: info.labels,
    datasets: [
      {
        label: title,
        data: info.data,
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
      <Bar data={data} />
    </Box>
  );
};

ChartCategory.propTypes = {
  sales_trend: PropTypes.array.isRequired,
  info: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default ChartCategory;
