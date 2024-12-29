import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({
  setStart_date,
  setEnd_date,
  start_date,
  end_date,
}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', cursor: 'pointer' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle" align="left">
          Inicio
        </Typography>
        <DatePicker
          label="Desde"
          value={start_date}
          onChange={(newValue) => {
            const newDate = new Date(newValue);
            const date = newDate.toISOString().split('T')[0];
            setStart_date(date);
          }}
          dateFormat={'dd/MM/yyyy'}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle" align="left">
          Fin
        </Typography>
        <DatePicker
          label="Hasta"
          value={end_date}
          onChange={(newValue) => {
            const newDate = new Date(newValue);
            const date = newDate.toISOString().split('T')[0];
            setEnd_date(date);
          }}
          dateFormat={'dd/MM/yyyy'}
        />
      </Box>
    </Box>
  );
};

DatePickerComponent.propTypes = {
  setStart_date: PropTypes.func,
  setEnd_date: PropTypes.func,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
};

export default DatePickerComponent;
