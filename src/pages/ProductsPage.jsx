import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import NavigationButton from '../components/navigation-button';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { apiFetchProducts } from '../api/api';
import {
  getCartFromLocalStorage,
  getProductsInCart,
} from '../helpers/cartHelpers';

const ProductPage = () => {
  const [idsInCart, setIdsInCart] = useState([]);
  const [arrProducts, setArrProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const products = await apiFetchProducts();
        setArrProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const cart = getCartFromLocalStorage();
    const productsInCart = getProductsInCart(arrProducts, cart);
    const ids = productsInCart.map((product) => product.id);
    setIdsInCart(ids);
  }, [arrProducts]);

  const productsPageFallback = (
    <Typography variant="h6">Cargando productos...</Typography>
  );

  return (
    <PageContainer>
      <PageHeader
        text="Productos"
        isLoading={isLoading}
        fallback={productsPageFallback}
      >
        <NavigationButton href="/cart" text="Carrito ►" />
      </PageHeader>
      <Box
        id="product-cards-container"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, minHeight: '500px' }}
      >
        {arrProducts.map((product) => {
          const isProductInCart = idsInCart.includes(product.id);
          return (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                product={product}
                isProductInCart={isProductInCart}
              />
            </Grid>
          );
        })}
      </Box>
    </PageContainer>
  );
};

export default ProductPage;
