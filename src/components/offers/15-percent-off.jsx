import { Box, Button } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const OfferFiftyPercentOff = () => {
  const { isAuthenticated } = useAppContext();
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
      }}
    >
      <Box className="image-container" sx={{ top: 0, left: 0, width: '100%' }}>
        <img
          style={{
            width: '100%',
          }}
          src="img/offers/yellow-product.png"
          alt="yellow-product"
        />
      </Box>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to={isAuthenticated ? '/products' : '/register'}
        sx={{
          position: 'absolute',
          bottom: '1.3rem',
          right: '1rem',
          color: 'white',
          border: 'solid 1px white',
        }}
      >
        {isAuthenticated ? 'Ver productos' : 'Registrate para ver productos'}
      </Button>
    </Box>
  );
};

export default OfferFiftyPercentOff;
