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
        boxShadow: '0 4px 10px rgba(4px, 3px, 0, 0.1)',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: 'rgba(255, 235, 235, 0.97)',
        outline: 'solid 1px rgba(190, 190, 190, 0.5)',
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
