import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const OfferCrecimiento = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
    >
      <Box className="image-container" sx={{ top: 0, left: 0, width: '100%' }}>
        <img
          style={{
            height: '100%',
            width: '100%',
          }}
          src="img/offers/crecimiento.jpg"
          alt="yellow-product"
        />
      </Box>
      <Button
        variant="contained"
        component={Link}
        to={'/products/2'}
        sx={{
          position: 'absolute',
          bottom: '1.3rem',
          right: '1rem',
          background: 'black',
          color: 'white',
        }}
      >
        Comprar
      </Button>
    </Box>
  );
};

export default OfferCrecimiento;
