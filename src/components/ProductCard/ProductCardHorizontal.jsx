import { Box, Card, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import AddRemoveProductButton from '../AddRemoveProductButton/';
import RatingStarsSelector from '../Reviews/RatingStarsSelector';
import removeNumberIndexFromImgPath from '../../helpers/removeNumberIndexFromImgPath';

const ProductCardHorizontal = memo(({ product, isProductInCart }) => {
  const { name, description, price, imageurl1, average_rating } = product;
  const img1 = removeNumberIndexFromImgPath(imageurl1);
  const [isInCart, setIsInCart] = useState(isProductInCart);

  useEffect(() => {
    setIsInCart(isProductInCart);
  }, [isProductInCart]);

  const cardStyles = {
    maxWidth: '400px',
    borderRadius: '10px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <Card
      className="product-card-container"
      sx={cardStyles}
      elevation={isInCart ? 1 : 0}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <img
          src={img1}
          alt={product.name}
          style={{
            transition: 'all 0.3s ease-in-out',
            transform: isInCart
              ? 'scale(1.5) rotate(3deg) translateY(30px)'
              : 'scale(1) rotate(0deg)',
            width: '200px',
            height: 'auto',
            zIndex: 1,
          }}
        />
        <Box
          className="product-card-info"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'end',
            padding: 1,
            zIndex: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              minHeight: '65px',
              display: 'flex',
              textAlign: 'right',
              width: '100%',
            }}
          >
            {name}
          </Typography>
          <RatingStarsSelector
            initialValue={parseInt(average_rating)}
            disableSelection
          />
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: 'right',
              minHeight: '65px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {description}
          </Typography>
          <Typography variant="h6" sx={{ margin: 1, textAlign: 'center' }}>
            ${price}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ zIndex: 3 }}>
        <AddRemoveProductButton
          product={product}
          isAlreadyIncart={isInCart}
          onClick={() => setIsInCart((prev) => !prev)}
        />
      </Box>
    </Card>
  );
});

ProductCardHorizontal.displayName = 'ProductCard';

ProductCardHorizontal.propTypes = {
  product: PropTypes.object.isRequired,
  isProductInCart: PropTypes.bool.isRequired,
  disableLinkToDetails: PropTypes.bool,
  isHorizontal: PropTypes.bool,
};

export default ProductCardHorizontal;
