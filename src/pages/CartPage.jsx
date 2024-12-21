import { Box, Button, Divider, List, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import { useAppContext } from '../context/AppContext';

import CartItem from '../components/CartItem';
import {
  getCartFromLocalStorage,
  getCartSummary,
} from '../helpers/cartHelpers';
import OrderDetails from '../components/OrderDetails';
import DisplayRandomProducts from '../components/DisplayRandomProducts';

const CartPage = () => {
  const [isEmptyCart, setIsEmptyCart] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [cart] = useState(getCartFromLocalStorage());

  const { updateOrderDetails, cartCount } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { subtotal, taxes, total, shipping } = await getCartSummary(cart);
      updateOrderDetails({
        subtotal,
        taxes,
        shipping,
        total,
      });

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIsEmptyCart(cartCount === 0);
  }, [cartCount]);

  return (
    <PageContainer>
      <PageHeader title="Carrito" isLoading={isLoading}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button component={Link} variant="contained" to="/products">
            ◄ Productos
          </Button>
          <Button component={Link} variant="contained" to="/orders">
            Pago ►
          </Button>
        </Box>
      </PageHeader>

      <Typography variant="h5" gutterBottom textAlign="center">
        Resumen del pedido
      </Typography>
      <Box
        id="order-summary-container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: '600px',
          margin: 'auto',
        }}
      >
        <List>
          {cart.map((item, index) => (
            <CartItem index={index} key={item.id} const item={item} />
          ))}
        </List>

        <Divider sx={{ margin: 2 }} />
        <OrderDetails />
      </Box>
      <DisplayRandomProducts />
    </PageContainer>
  );
};

export default CartPage;
