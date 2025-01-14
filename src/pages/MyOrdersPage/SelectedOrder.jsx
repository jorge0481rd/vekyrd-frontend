import {
  Box,
  Button,
  Grid2 as Grid,
  Typography,
  Modal,
  CircularProgress,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { apiFetchCartByOrder } from '../../api/api';

const SelectedOrder = ({ data, open, handleClose }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    setLoading(true);
    try {
      const productsData = await apiFetchCartByOrder(data?.order_hash);
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products by order:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [data]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '6rem',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '90%',
          maxHeight: '80%',
          overflow: 'auto',
          padding: '1rem',
          zIndex: 10,
        }}
      >
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Box
          id="product-cards-container"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <Typography variant="h5">Productos del pedido</Typography>
          <Button size="small" variant="contained" onClick={handleClose}>
            Cerrar
          </Button>
        </Box>
        <Box
          id="product-cards-container"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            top: '2rem',
            overflow: 'auto',
            justifyContent: 'center',
            transform: 'scale(0.8)',
          }}
        >
          {products &&
            products.map((product) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard
                    product={product}
                    isProductInCart={false}
                    buyAgain={true}
                  />
                </Grid>
              );
            })}
        </Box>
      </Box>
    </Modal>
  );
};

SelectedOrder.propTypes = {
  data: PropTypes.object,
  setSelectedData: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SelectedOrder;
