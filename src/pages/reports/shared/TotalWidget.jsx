import { Box, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../utils/formatPrice';

const TotalWidget = ({ value, title }) => {
  return (
    <Box sx={{ width: '400px', marginBottom: 2 }}>
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3" gutterBottom fontWeight={700} color="grey.500">
          {formatPrice(value)}
        </Typography>
      </Paper>
    </Box>
  );
};

TotalWidget.propTypes = {
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default TotalWidget;
