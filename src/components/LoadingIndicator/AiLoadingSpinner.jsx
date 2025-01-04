import { keyframes } from '@emotion/react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Box, Typography } from '@mui/material';
import PropType from 'prop-types';

const AiLoadingSpinner = ({ size }) => {
  const loadingAnimation = keyframes`
	 0%{color: #cccccc; transform: translateX(10px)}	   
	 50%{color: #cccccc; transform: translateX(6px)}	   
	 100%{color: #fefefe; transform: translateX(13px)}
	`;
  return (
    <Box sx={{ position: 'relative' }}>
      <AutoAwesomeIcon
        sx={{
          animation: `${loadingAnimation} 3s infinite linear alternate`,
          color: '#cccccc',
          fontSize: size,
        }}
      />
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-0%, -50%)',
          fontSize: '3rem',
          color: '#dedede',
          width: '100px',
        }}
      >
        IA
      </Typography>
    </Box>
  );
};

AiLoadingSpinner.propTypes = {
  size: PropType.string.isRequired,
};

export default AiLoadingSpinner;
