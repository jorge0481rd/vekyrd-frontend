import { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import NavigationButton from '../components/navigation-button';
import { Box, Grid } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchWishlist } from '../helpers/productHelpers';

const WishlistPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // fetch wishlist
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const wishList = await fetchWishlist();
        const ps = await fetchProducts();
        const arrProducts = ps.products;

        const wishProducts = wishList.map((wish) => {
          const product = arrProducts.find(
            (product) => product.id === wish.product_id
          );
          if(product) product.isInWishlist = true;
          return product;
        })
        .filter(p => p !== undefined)

        setProducts(wishProducts);
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
