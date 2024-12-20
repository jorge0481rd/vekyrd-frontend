import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import { getProductDetails } from '../api/api';
import { getCartFromLocalStorage } from '../helpers/cartHelpers';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import PictureCarrousel from '../components/PictureCarrousel';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await getProductDetails(productId);
        setProduct(productData);
      } catch (error) {
        setError('Error loading product details.');
        console.log('error.message', error.message);
      }
    };

    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    const cart = getCartFromLocalStorage();
    const isInCart = cart.find((item) => item.id === parseInt(productId));
    console.log({ isInCart, cart, productId: Number(productId) });
  }, [productId]);

  useEffect(() => {
    const cart = getCartFromLocalStorage();
    const isInCart = cart.find((item) => item.id === parseInt(productId));
    setIsProductInCart(Boolean(isInCart));
  }, [productId]);

  if (error) return <Typography>{error}</Typography>;

  return (
    <PageContainer>
      <PageHeader
        title={product && product.name}
        isLoading={!product}
        isLoadingText="Cargando productos..."
      >
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button component={Link} variant="contained" to="/products">
            ◄ Productos
          </Button>
        </Box>
      </PageHeader>

      {product && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <ProductCard
            product={product}
            isProductInCart={isProductInCart}
            disableLinkToDetails
          />
          <Box sx={{ width: '100%', maxWidth: '400px' }}>
            <Typography variant="h6">
              This product contains nutrients for your hair that will help to
              keep it healthy and shiny. It also contains vitamins and minerals
              that will nourish your skin and hair. The last studies show that
              this product can help to improve the health of your hair and
              scalp.
            </Typography>
          </Box>
          <PictureCarrousel
            pictures={[
              '/img/products/gel1.jpg',
              '/img/products/conditioner1.jpg',
              '/img/products/conditioner2.jpg',
            ]}
          />
        </Box>
      )}

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h5">Comentarios</Typography>
      </Box>
    </PageContainer>
  );
};

export default ProductDetailPage;
