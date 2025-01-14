import { Box } from '@mui/material';
import Navbar from './navbar';
import Footer from './Footer';
import PropTypes from 'prop-types';

const PageContainer = ({ children, sx }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        marginTop: '70px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#eeeeee',
        backgroundImage: 'url(bg-pattern.png)',
        backgroundRepeat: 'repeat',
        ...sx,
      }}
    >
      <Navbar />
      <Box
        sx={{
          flex: 1,
          height: '100%',
          boxSizing: 'border-box',
          padding: '1rem 3rem',
          width: '100%',
          maxWidth: '1200px',
          margin: 'auto',
          backgroundColor: '#ffffff',
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default PageContainer;
