import { Grid, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const TotalWidget = ({ value, title }) => {
  return (
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3" gutterBottom>
          ${value}
        </Typography>
      </Paper>
    </Grid>
  );
};

TotalWidget.propTypes = {
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default TotalWidget;
