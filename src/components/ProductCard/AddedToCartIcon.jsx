import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Typography } from '@mui/material';

const containerStyle = {
  position: 'relative',
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const checkStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  color: 'green',
  transform: 'translate(5px, -28px)',
};

const cartStyle = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  fontSize: '30px',
};

const textStyle = {
  fontSize: '10px',
  transform: 'translate(-8px, 15px)',
};

const AddedToCartIcon = () => {
  return (
    <Box sx={containerStyle} title="Añadido al carrito">
      <CheckCircleIcon sx={checkStyle} />
      <ShoppingCartIcon sx={cartStyle} />
      <Typography variant="subtitle" sx={textStyle}>
        Agregado
      </Typography>
    </Box>
  );
};

export default AddedToCartIcon;
