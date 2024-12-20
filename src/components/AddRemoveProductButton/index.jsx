import { Box, Button } from '@mui/material';
import AddedToCartIcon from '../ProductCard/AddedToCartIcon';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/AppContext';

const AddRemoveProductButton = ({ product, isInCart, setIsInCart }) => {
  const { addOrRemoveToCart } = useAppContext();

  const handleAddOrRemove = (product) => {
    addOrRemoveToCart(product);
    setIsInCart((prev) => !prev);
  };
  return (
    <Box sx={{ position: 'relative', display: 'flex' }}>
      <Box
        sx={{
          position: 'absolute',
          bottom: '1rem',
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
  isInCart: PropTypes.bool.isRequired,
  setIsInCart: PropTypes.func.isRequired,
};

export default AddRemoveProductButton;
