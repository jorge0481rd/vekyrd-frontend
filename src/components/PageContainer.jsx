import { Box } from '@mui/material';
import Navbar from './navbar';
import Footer from './Footer';
import PropTypes from 'prop-types';

const PageContainer = ({ children }) => {
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
        // outline: '1px solid red',
        // backgroundColor: 'yellow',
        // margin: 4,
      }}
    >
      <Navbar />
      <Box
        sx={{
          flex: 1,
          height: '100%',
          padding: '1rem',
          width: '100%',
          maxWidth: '1200px',
          margin: 'auto',
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
};

export default PageContainer;
