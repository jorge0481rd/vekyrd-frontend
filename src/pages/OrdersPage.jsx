import { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { apiCreateOrder, apiPayment } from '../api/api';
import PageContainer from '../components/PageContainer';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import OrderDetails from '../components/OrderDetails';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { validatePaymentCardForm } from '../helpers/validatePaymentCardForm';
import { getCartFromLocalStorage } from '../helpers/cartHelpers';

const OrderPage = () => {
  const [orderHash, setOrderHash] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmationHash, setConfirmationHash] = useState('');
  const [cardDetails, setCardDetails] = useState({
    name: 'JORGE LOPEZ',
    number: '4342252563634126',
    expiry: '12/25',
    cvc: '123',
    focus: false,
  });

  const [shippingDetails, setShippingDetails] = useState({
    address1: 'C/Duarte #45',
    address2: 'C/Duarte #45, Miraflores',
    sector: 'Miraflores',
    city: 'Santo Domingo Este',
    country: 'República dominicana',
    zipcode: '99809',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, resetPurchase } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    const items = orderDetails && orderDetails.items;
    const isEmptyCart = items && items.length === 0;
    if (isEmptyCart && !confirmationHash) navigate('/products');
  }, [confirmationHash, navigate, orderDetails]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const createOrder = async () => {
      try {
        // get cart
        const cart = getCartFromLocalStorage();
        const order = await apiCreateOrder(cart);
        setOrderHash(order.order_hash);
      } catch (error) {
        if (error.response.status === 403) {
          navigate('/login');
        }
        console.log(error);
      }
    };

    createOrder();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const item = localStorage.getItem('orderDetails');
    const orderDetails = item ? JSON.parse(item) : {};
    setOrderDetails(orderDetails);
  }, []);

  const handleShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    if (!validatePaymentCardForm(cardDetails, setErrorMessage)) return;

    const cart = getCartFromLocalStorage();

    try {
      const paymentData = await apiPayment({
        orderHash,
        ...orderDetails,
        cart: cart,
        paymentDetails: cardDetails,
        shippingDetails,
      });

      if (paymentData.status === 'success') {
        setConfirmationHash(paymentData.confirmationHash);
        resetPurchase();
        setSuccessMessage('Pago realizado con éxito.');
      } else {
        setErrorMessage('El pago fue rechazado. Intente nuevamente.');
      }
    } catch (error) {
      setErrorMessage('Hubo un error al procesar el pago. Intente nuevamente.');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setCardDetails((prev) => ({ ...prev, focus: evt.target.name }));
  };

  if (successMessage)
    return (
      <PageContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Pago exitoso
          </Typography>
          <Typography variant="h6" gutterBottom>
            ¡Gracias por su compra!
          </Typography>
          <Typography variant="body1">
            Su codigo de confirmación es: <b>{confirmationHash}</b>
          </Typography>
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/products"
              fullWidth
            >
              Ver otros productos
            </Button>
          </Box>
        </Box>
      </PageContainer>
    );

  if (!isAuthenticated) return null;

  return (
    <PageContainer>
      <PageHeader
        title="Pago"
        isLoading={isLoading}
        isLoadingText="Cargando..."
      >
        <Typography variant="body1" gutterBottom sx={{ textAlign: 'right' }}>
          Pedido #: {orderHash}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button component={Link} variant="contained" to="/cart">
            ◄ Carrito
          </Button>
        </Box>
      </PageHeader>
      <Box
        id="payment-forms-container"
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          padding: 2,
          maxWidth: '1200px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            flex: 1,
            maxWidth: '400px',
          }}
        >
          <Cards
            number={cardDetails.number}
            expiry={cardDetails.expiry}
            cvc={cardDetails.cvc}
            name={cardDetails.name}
            focused={cardDetails.focus}
          />
          <TextField
            type="name"
            name="name"
            placeholder="Nombre del cliente"
            value={cardDetails.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <TextField
            type="number"
            name="number"
            placeholder="Número de tarjeta"
            value={cardDetails.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <TextField
            type="expiry"
            name="expiry"
            placeholder="Fecha de vencimiento"
            value={cardDetails.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <TextField
            type="cvc"
            name="cvc"
            placeholder="cvc"
            value={cardDetails.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </Box>

        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            flex: 1,
            maxWidth: '400px',
          }}
          noValidate
        >
          <Typography variant="h6">Detalles de envío</Typography>
          <TextField
            label="Calle y número"
            name="address1"
            value={shippingDetails.address1}
            onChange={handleShippingInputChange}
            fullWidth
          />
          <TextField
            label="Sector"
            name="address2"
            value={shippingDetails.address2}
            onChange={handleShippingInputChange}
            fullWidth
          />
          <TextField
            label="Ciudad"
            name="city"
            value={shippingDetails.city}
            onChange={handleShippingInputChange}
            fullWidth
          />
          <TextField
            label="País"
            name="country"
            value={shippingDetails.country}
            onChange={handleShippingInputChange}
            fullWidth
          />
          <OrderDetails />
          <Button variant="contained" color="primary" onClick={handlePayment}>
            {isLoading ? (
              <>
                <CircularProgress color="#ffffff" size={20} />
                &nbsp;
                <span>Procesando...</span>
              </>
            ) : (
              'Pagar ahora'
            )}
          </Button>

          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}
        </Box>
      </Box>
    </PageContainer>
  );
};

export default OrderPage;
