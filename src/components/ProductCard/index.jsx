import { Box, Card, Paper, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import AddRemoveProductButton from '../AddRemoveProductButton/';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const ProductCard = memo(
  ({ product, isProductInCart, disableLinkToDetails = false }) => {
    const { name, description, price, imageurl } = product;
    const [isInCart, setIsInCart] = useState(isProductInCart);
    const [liked, setLiked] = useState(false);

    const navigate = useNavigate();

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

        <Paper
          className="product-card-image"
          elevation={isInCart ? 1 : 0}
          sx={{ position: 'relative', overflow: 'hidden' }}
        >
          <img
            width={200}
            height={218}
            src={imageurl}
            alt={product.name}
            style={{
              transition: 'all 0.3s ease-in-out',
              transform: isInCart
                ? 'scale(1.5) rotate(3deg) translateY(30px)'
                : 'scale(1) rotate(0deg)',
            }}
          />

          {!disableLinkToDetails && (
            <Box
              className="view-details-button"
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                cursor: 'pointer',
                alignItems: 'center',
                transition: 'all 0.3s ease-in-out',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                opacity: 0,
                '&:hover': {
                  opacity: 0.8,
                },
              }}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <VisibilityIcon sx={{ color: 'white', fontSize: '3.5rem' }} />
              <Typography
                variant="p"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: '1rem',
                }}
              >
                Detalles
              </Typography>{' '}
            </Box>
          )}
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

        <AddRemoveProductButton
          product={product}
          isAlreadyIncart={isInCart}
          onClick={() => setIsInCart((prev) => !prev)}
        />
      </Card>
    );
  }
);

ProductCard.displayName = 'ProductCard';

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isProductInCart: PropTypes.bool.isRequired,
  disableLinkToDetails: PropTypes.bool,
};

export default ProductCard;
