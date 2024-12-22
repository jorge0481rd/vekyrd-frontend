import { Box, Button } from '@mui/material';
import AddedToCartIcon from '../ProductCard/AddedToCartIcon';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';

const AddRemoveProductButton = ({ product, isAlreadyIncart, onClick }) => {
  const [isInCart, setIsInCart] = useState(false);

  const { addOrRemoveToCart } = useAppContext();

  useEffect(() => {
    setIsInCart(isAlreadyIncart);
  }, [isAlreadyIncart]);

  const handleAddOrRemove = (product) => {
    addOrRemoveToCart(product);
    setIsInCart((prev) => !prev);
    onClick && onClick();
  };
  return (
    <Box sx={{ position: 'relative', display: 'flex' }}>
      <Box
        sx={{
          position: 'absolute',
          bottom: '1.3rem',
          right: isInCart ? '1rem' : '-40px',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <AddedToCartIcon />
      </Box>

      <Button
        variant={isInCart ? 'text' : 'contained'}
        onClick={() => handleAddOrRemove(product)}
        sx={{
          color: isInCart ? 'red' : 'white',
          margin: 1,
          flex: 1,
        }}
      >
        {isInCart ? 'Quitar' : 'Añadir'}
      </Button>
    </Box>
  );
};

AddRemoveProductButton.propTypes = {
  product: PropTypes.object.isRequired,
  isAlreadyIncart: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default AddRemoveProductButton;
