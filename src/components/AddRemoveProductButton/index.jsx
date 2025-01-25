import { Box, Button } from '@mui/material';
import AddedToCartIcon from '../ProductCard/AddedToCartIcon';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';

const AddRemoveProductButton = ({
  product,
  isAlreadyIncart,
  onClick,
  buyAgain = false,
}) => {
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

  const getCaption = () => {
    if (buyAgain) {
      return isInCart ? (
        'Quitar'
      ) : (
        <span style={{ fontSize: '0.8rem' }}>Comprar de Nuevo</span>
      );
    }
    return isInCart ? 'Quitar' : 'Añadir';
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
        variant='contained'
        onClick={() => handleAddOrRemove(product)}
        sx={{
          color: isInCart ? 'red' : 'white',
          background: isInCart ? 'rgba(255, 255, 255, 0.6)' : (theme) => theme.palette.primary.main,
          margin: 1,
          transition: 'all 0.3s ease-in-out',
          transform: isInCart ? 'translateX(-30%)' : 'none',
          textAlign: isInCart ? 'right' : 'center',
          paddingLeft: isInCart ? '50%' : '10%',
          flex: 1,
        }}
      >
        {getCaption()}
      </Button>
    </Box>
  );
};

AddRemoveProductButton.propTypes = {
  product: PropTypes.object.isRequired,
  isAlreadyIncart: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  buyAgain: PropTypes.bool,
};

export default AddRemoveProductButton;
