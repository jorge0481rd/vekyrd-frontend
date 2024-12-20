import { Box, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const PageHeader = ({ text, children, isLoading = false, fallback = null }) => {
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
          id="page-header-loading"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'absolute',
            width: '100%',
            top: '50%',
          }}
        >
          <CircularProgress />
          {fallback}
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
  fallback: PropTypes.object,
};

export default PageHeader;
