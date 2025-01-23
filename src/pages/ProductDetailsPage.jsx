import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import { getProductDetails } from '../api/api';
import { getCartFromLocalStorage } from '../helpers/cartHelpers';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import PictureCarrousel from '../components/PictureCarrousel';
import randomlyFormatParagraph from '../helpers/randomlyFormatParragraph';
import Reviews from '../components/Reviews';
import removeNumberIndexFromImgPath from '../helpers/removeNumberIndexFromImgPath';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxTextLength = 350;
  const img1 = removeNumberIndexFromImgPath(product?.imageurl1);
  const img2 = removeNumberIndexFromImgPath(product?.imageurl2);
  const img3 = removeNumberIndexFromImgPath(product?.imageurl3);
  console.log(img1, img2, img3);


  const getFormattedParagraph = (product, isExpanded) => {
    const paragraph = product.description_large;
    if (isExpanded) {
      return randomlyFormatParagraph(paragraph);
    } else {
      return (
        randomlyFormatParagraph(paragraph).slice(0, maxTextLength) + ' ...'
      );
    }
  };

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
    setIsProductInCart(Boolean(isInCart));
  }, [productId]);

  if (error) return <Typography>{error}</Typography>;

  return (
    <PageContainer>
      <PageHeader
        title={(product && product.name) || ''}
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
            <div
              dangerouslySetInnerHTML={{
                __html: getFormattedParagraph(product, isExpanded),
              }}
            />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="text" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Ver menos' : 'Ver más'}
              </Button>
            </Box>
          </Box>
          <PictureCarrousel
            pictures={[img1, img2, img3]}
          />
        </Box>
      )}

      <Reviews productId={productId} />
    </PageContainer>
  );
};

export default ProductDetailPage;
