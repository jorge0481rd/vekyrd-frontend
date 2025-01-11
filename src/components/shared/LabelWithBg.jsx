import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const LabelBg = ({ children }) => {
  return (
    <Typography
      variant="body1"
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        padding: '2px 10px',
        margin: '4px 0',
      }}
    >
      {children}
    </Typography>
  );
};

LabelBg.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LabelBg;
