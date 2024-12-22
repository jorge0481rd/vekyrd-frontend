import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavigationButton = ({ onClick = null, href = null, text }) => {
  return (
    <Box
      sx={{
        marginTop: 3,
        textAlign: 'right',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        to={href}
        sx={{ marginTop: 2 }}
        onClick={onClick}
        component={Link}
      >
        {text}
      </Button>
    </Box>
  );
};

NavigationButton.propTypes = {
  onClick: PropTypes.func,
  href: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default NavigationButton;
