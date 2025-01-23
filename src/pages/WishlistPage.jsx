import { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import NavigationButton from '../components/navigation-button';
import { Box, Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchWishlist } from '../helpers/productHelpers';
import DisplayRandomProducts from '../components/DisplayRandomProducts';

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
          if (product) product.isInWishlist = true;
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

  const hasFavoriteProducts = products.length > 0;

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
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={`${product.id}${product.name}`}>
            <ProductCard product={product} isProductInCart={false} />
          </Grid>
        ))}
      </Box>
      {hasFavoriteProducts && <NavigationButton href="/products" text="Ver más productos" justifyContent='center' />}
      {!hasFavoriteProducts && !isLoading && (
        <Box sx={{ margin: '2rem', display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            No tienes productos en tu lista de favoritos
          </Typography>
          <Typography variant="body1">
            Visita nuestro catálogo para encontrar productos que te gusten y añadelos a tu lista de favoritos.
          </Typography>
          <NavigationButton href="/products" text="Ver todos los productos" justifyContent='center' />
          <DisplayRandomProducts />
        </Box>
      )}
    </PageContainer>
  );
};

export default WishlistPage;
