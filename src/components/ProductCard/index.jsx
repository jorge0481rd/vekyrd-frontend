import { Box, Button, Card, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddedToCartIcon from './AddedToCartIcon';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppContext } from '../../context/AppContext';
import PropTypes from 'prop-types';

const ProductCard = ({ product, isProductInCart }) => {
  const { name, description, price, imageurl } = product;
  const [isInCart, setIsInCart] = useState(isProductInCart);
  const [liked, setLiked] = useState(false);

  const { addOrRemoveToCart } = useAppContext();

  const handleAddOrRemove = (product) => {
    const isInCart = addOrRemoveToCart(product);
    setIsInCart(isInCart);
  };

  useEffect(() => {
    setIsInCart(isProductInCart);
  }, [isProductInCart]);

  return (
    <Card
      className="product-card-container"
      sx={{
        width: '200px',
        backgroundColor: isInCart ? '#f4ffdf' : 'white',
        borderRadius: '10px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.2s ease-in-out',
        transform: `translateY(${isInCart ? '-8px' : '0'})
										scale(${isInCart ? '0.97' : '1'})
				`,
      }}
      elevation={isInCart ? 1 : 0}
    >
      <Box
        onClick={() => setLiked(!liked)}
        sx={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          outline: 'solid 1px rgba(0, 0, 0, 0)',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
        }}
      >
        <FavoriteIcon
          sx={{
            transition: 'all 0.3s ease-in-out',
            position: 'absolute',
            opacity: liked ? 1 : 0,
            color: 'red',
            transform: liked ? 'scale(1.3)' : 'scale(1)',
          }}
        />
        <FavoriteBorderIcon
          sx={{
            transition: 'all 0.3s ease-in-out',
            opacity: liked ? 0 : 1,
            transform: liked ? 'scale(1.6)' : 'scale(1)',
            position: 'absolute',
          }}
        />
      </Box>

      <Paper className="product-card-image" elevation={isInCart ? 1 : 0}>
        <img width={200} height={218} src={imageurl} alt={product.name} />
      </Paper>

      <Box
        className="product-card-info"
        sx={{ margin: '1rem', flex: 1, minHeight: '95px' }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: 700, textAlign: 'center' }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', textAlign: 'center' }}
        >
          {description}
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ margin: 1, textAlign: 'center' }}>
        ${price}
      </Typography>

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
        }}
      >
        {isInCart ? 'Quitar' : 'Añadir'}
      </Button>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isInCart: PropTypes.bool.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  isProductInCart: PropTypes.bool.isRequired,
};

export default ProductCard;
