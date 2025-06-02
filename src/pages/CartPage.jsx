import { Box, Button, List, Typography } from '@mui/material';
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
  const [cart, setCart] = useState(getCartFromLocalStorage());

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

    setCart(getCartFromLocalStorage());
  }, [cartCount]);

  return (
    <PageContainer>
      <PageHeader title="Carrito" isLoading={isLoading}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
          <Button
            component={Link}
            color="secondary"
            variant="contained"
            to="/products"
          >
            ◄ Productos
          </Button>
          {cart.length > 0 && (
            <Button
              component={Link}
              color="secondary"
              variant="contained"
              to="/orders"
            >
              Pago ►
            </Button>
          )}
        </Box>
      </PageHeader>

      {isEmptyCart && !isLoading && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <img
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '10px',
              transform: 'translateX(-25px)',
            }}
            src="/empty_cart.svg"
            alt="Carrito vacío"
          />
          <Typography variant="h5" gutterBottom>
            Su carrito está vacío
          </Typography>
          <Typography variant="body1">
            Puede agregar productos a su carrito para poder realizar un pedido.
          </Typography>
          <Button component={Link} variant="contained" to="/products">
            Ver Productos
          </Button>
        </Box>
      )}

      {!isEmptyCart && !isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h5" gutterBottom textAlign="center">
            Resumen del pedido
          </Typography>
          <img
            src="toldo.jpg"
            alt="Toldo"
            style={{ width: '100%', maxWidth: '400px' }}
          />
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
            <OrderDetails />
          </Box>
        </Box>
      )}
      <DisplayRandomProducts />
    </PageContainer>
  );
};

export default CartPage;
