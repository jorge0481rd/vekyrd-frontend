import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ContactCard = ({ Icon, title, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '150px',
        width: '200px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: '#ffffff',
      }}
    >
      {<Icon sx={{ color: 'primary.main', fontSize: '3rem' }} />}
      <Typography
        variant="body1"
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

ContactCard.propTypes = {
  Icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ContactCard;
