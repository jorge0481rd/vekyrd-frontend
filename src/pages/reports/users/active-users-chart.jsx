import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

ChartJS.register(ArcElement, Tooltip, Legend);

const ActiveUsersChart = ({ users }) => {
  const activos = users?.filter((user) => user.active === true).length;
  const inactivos = users?.filter((user) => user.active === false).length;
  const data = {
    labels: [`${activos} Activos`, `${inactivos} Inactivos`],
    datasets: [
      {
        data: [activos, inactivos],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

ActiveUsersChart.propTypes = {
  users: PropTypes.array.isRequired,
};

export default ActiveUsersChart;
