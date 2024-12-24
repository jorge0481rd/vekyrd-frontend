import { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import NavigationButton from '../components/navigation-button';
import { Box, Grid } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { fetchWishlist } from '../helpers/productHelpers';

const WishlistPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // fetch wishlist
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const wishlist = await fetchWishlist();
        setProducts(wishlist);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PageContainer>
      <PageHeader
        title="Lista de favoritos"
        subtitle="Los productos que siempre has querido encontrar"
        isLoading={isLoading}
        isLoadingText="Cargando productos..."
      >
        <NavigationButton href="/cart" text="Carrito ►" />
      </PageHeader>

      <Box
        id="product-cards-container"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, minHeight: '500px' }}
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} isProductInCart={false} />
          </Grid>
        ))}
      </Box>
    </PageContainer>
  );
};

export default WishlistPage;
