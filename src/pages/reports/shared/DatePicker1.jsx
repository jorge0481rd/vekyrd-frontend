import { Box, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({
  setDate_start,
  setDate_end,
  date_start,
  date_end,
  updateFunc,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        flexWrap: 'wrap',
        cursor: 'pointer',
        gap: 1,
        justifyContent: { xs: 'center', md: 'flex-start' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <DatePicker
          dateFormat={'dd/MM/yyyy'}
          value={date_start}
          onChange={(newValue) => {
            const newDate = new Date(newValue);
            const date = newDate.toISOString().split('T')[0];
            setDate_start(date);
          }}
          customInput={
            <TextField
              label="Fecha inicio"
              variant="outlined"
              fullWidth
              value={date_start}
              sx={{ background: '#ffffff' }}
            />
          }
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <DatePicker
          dateFormat={'dd/MM/yyyy'}
          value={date_end}
          onChange={(newValue) => {
            const newDate = new Date(newValue);
            const date = newDate.toISOString().split('T')[0];
            setDate_end(date);
          }}
          customInput={
            <TextField
              label="Fecha fin"
              variant="outlined"
              fullWidth
              value={date_end}
              sx={{ background: '#ffffff' }}
            />
          }
        />
      </Box>
      <Button variant="contained" onClick={updateFunc}>
        Actualizar
      </Button>
    </Box>
  );
};

DatePickerComponent.propTypes = {
  setDate_start: PropTypes.func,
  setDate_end: PropTypes.func,
  date_start: PropTypes.string,
  date_end: PropTypes.string,
  updateFunc: PropTypes.func,
};

export default DatePickerComponent;
