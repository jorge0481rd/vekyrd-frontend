import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { apiFetchProducts } from '../../api/api';
import NavigationButton from '../navigation-button';
import ProductCard from '../ProductCard';

const DisplayRandomProducts = ({ quantity = 3 }) => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const getRandomProducts = async (quantity) => {
      const products = await apiFetchProducts();

      const randomStartIndex = Math.floor(Math.random() * 7);
      const slicedProducts = products.slice(randomStartIndex, 10);

      const randomProducts = slicedProducts
        .sort(() => Math.random() - 0.5)
        .slice(0, quantity);

      setRandomProducts(randomProducts);
    };
    getRandomProducts(quantity);
  }, [quantity]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        marginBottom: 4,
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box
        className="drp-divider"
        sx={{ borderTop: '1px solid lightgray', margin: 4, width: '100%' }}
      />

      <Typography variant="h5" textAlign="center">
        Nuestros productos recomendados
      </Typography>
      <Box
        className="drp-random-products-container"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        {randomProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isProductInCart={false}
          />
        ))}
      </Box>
      <Box sx={{ margin: '0 auto' }}>
        <NavigationButton href="/products" text="Ver todos los productos" />
      </Box>
    </Box>
  );
};

DisplayRandomProducts.propTypes = {
  quantity: PropTypes.number,
};

export default DisplayRandomProducts;
