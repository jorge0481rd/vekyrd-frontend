import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import IsloadingFallback from './IsloadingFallback';

const PageHeader = ({
  title,
  subtitle = '',
  children,
  isLoading = false,
  isLoadingText,
}) => {
  return (
    <Box
      id="page-header"
      sx={{
        width: '100%',
        margin: '1rem',
        padding: '1rem',
        position: 'relative',
        boxSizing: 'border-box',
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
          <IsloadingFallback isLoadingText={isLoadingText} />
        </Box>
      )}
      <Typography variant="h4" textAlign={'center'}>
        {title}
      </Typography>
      <Typography variant="h6" textAlign={'center'} mt={2}>
        {subtitle}
      </Typography>
      <>{children}</>
    </Box>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  isLoadingText: PropTypes.string,
  fallback: PropTypes.object,
};

export default PageHeader;
