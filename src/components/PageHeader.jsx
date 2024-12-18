import { Box, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const PageHeader = ({ text, children, isLoading = false }) => {
  return (
    <Box
      id="page-header"
      sx={{
        width: '100%',
        margin: '1rem',
        position: 'relative',
      }}
    >
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Typography variant="h4" textAlign={'center'}>
        {text}
      </Typography>
      <>{children}</>
    </Box>
  );
};

PageHeader.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default PageHeader;
