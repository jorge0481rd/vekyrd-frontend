import { Box, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const IsloadingFallback = ({ isLoadingText }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '1rem',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
        position: 'relative',
        zIndex: 10,
        marginTop: '4rem',
      }}
    >
      <Box
        className="fallback-backgrouund"
        sx={{
          position: 'absolute',
          top: '3rem',
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          opacity: 0.5,
          zIndex: -1,
        }}
      ></Box>
      <Typography variant="h6" sx={{ marginBottom: '3rem' }}>
        {isLoadingText}
      </Typography>
      <CircularProgress
        size={100}
        color="info"
        thickness={0.3}
        variant="indeterminate"
      />
    </Box>
  );
};

IsloadingFallback.propTypes = {
  isLoadingText: PropTypes.string,
};

export default IsloadingFallback;
