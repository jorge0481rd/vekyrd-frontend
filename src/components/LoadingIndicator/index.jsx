import { Box, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const LoadingIndicator = ({ loading = false }) => {
  if (!loading) return null;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Cargando...
      </Typography>
      <CircularProgress />
    </Box>
  );
};

LoadingIndicator.propTypes = {
  loading: PropTypes.bool,
};

export default LoadingIndicator;
