import { useEffect, useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { apiClearCart, apiCreateOrder,  apiPayment } from '../api/api';
import PageContainer from '../components/PageContainer';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import PageHeader from '../components/PageHeader';

const OrderPage = () => {
	const [orderHash, setOrderHash] = useState('');
	const [orderDetails, setOrderDetails] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [confirmationHash, setConfirmationHash] = useState('');
	const [paymentDetails, setPaymentDetails] = useState({
		cardholderName: 'JORGE LOPEZ',
		cardNumber: '0000000000000001',
		expiryDate: '12/25',
		cvv: '123',
	});

	const [shippingDetails, setShippingDetails] = useState({
		address1: 'C/Duarte #45',
		address2: 'C/Duarte #45, Miraflores',
		sector: 'Miraflores',
		city: 'Santo Domingo Este',
		country: 'República dominicana',
		zipcode: '99809',
	});

	const navigate = useNavigate();

	useEffect(() => {
		const items = orderDetails && orderDetails.items
		const isEmptyCart = items && items.length === 0;
		if (isEmptyCart && !confirmationHash) navigate('/products')
	}, [confirmationHash, navigate, orderDetails])


	useEffect(() => {
		const createOrder = async () => {
			const order = await apiCreateOrder();
			setOrderHash(order.order_hash);
		}

		createOrder();
	}, []);

	const { updateCartCount } = useAppContext();

	const handlePaymentInputChange = (e) => {
		const { name, value } = e.target;
		setPaymentDetails({ ...paymentDetails, [name]: value });
	};

	const handleShippingInputChange = (e) => {
		const { name, value } = e.target;
		setShippingDetails({ ...shippingDetails, [name]: value });
	};

	const validateForm = () => {
		const { cardholderName, cardNumber, expiryDate, cvv } = paymentDetails;

		if (!cardholderName || !cardNumber || !expiryDate || !cvv) {
			setErrorMessage('Por favor, complete todos los campos.');
			return false;
		}

		if (!/^\d{16}$/.test(cardNumber)) {
			setErrorMessage('El número de tarjeta debe contener 16 dígitos.');
			return false;
		}

		if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
			setErrorMessage('La fecha de vencimiento debe estar en formato MM/YY.');
			return false;
		}

		if (!/^\d{3}$/.test(cvv)) {
			setErrorMessage('El CVV debe contener 3 dígitos.');
			return false;
		}

		setErrorMessage('');
		return true;
	};

	const handlePayment = async () => {
		if (!validateForm()) return;

		try {
			const paymentData = await apiPayment({
				orderHash,
				...orderDetails,
				paymentDetails,
				shippingDetails
			});

			if (paymentData.status === 'success') {
				setConfirmationHash(paymentData.confirmationHash);
				await apiClearCart();
				updateCartCount(0);
				setSuccessMessage('Pago realizado con éxito.');
			} else {
				setErrorMessage('El pago fue rechazado. Intente nuevamente.');
			}
		} catch (error) {
			setErrorMessage('Hubo un error al procesar el pago. Intente nuevamente.');
		}
	};

	if (successMessage) return <PageContainer>
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
			<Typography variant="h4" gutterBottom>Pago exitoso</Typography>
			<Typography variant="h6" gutterBottom>¡Gracias por su compra!</Typography>
			<Typography variant="body1">Su codigo de confirmación es: <b>{confirmationHash}</b></Typography>
			<Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
				<Button
					variant="contained"
					color="primary"
					component={Link}
					to="/products"
					fullWidth
				>Ver otros productos</Button>
			</Box>
		</Box>
	</PageContainer>

	return (
		<PageContainer>
			<PageHeader text="Pago">
				<Typography variant="body1" gutterBottom sx={{ textAlign: 'right' }}>Pedido #: {orderHash}</Typography>
				<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
					<Button component={Link} variant="contained" to="/cart">◄ Carrito</Button>
				</Box>
			</PageHeader>
			<Box id="payment-forms-container" sx={{ display: 'flex', gap: 2 }}>
				<Box
					component="form"
					sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}
					noValidate
				>
					<TextField
						label="Nombre del titular"
						name="cardholderName"
						value={paymentDetails.cardholderName}
						onChange={handlePaymentInputChange}
						fullWidth
					/>
					<TextField
						label="Número de tarjeta"
						name="cardNumber"
						value={paymentDetails.cardNumber}
						onChange={handlePaymentInputChange}
						fullWidth
					/>
					<TextField
						label="Fecha de vencimiento (MM/YY)"
						name="expiryDate"
						value={paymentDetails.expiryDate}
						onChange={handlePaymentInputChange}
						fullWidth
					/>
					<TextField
						label="CVV"
						name="cvv"
						type="password"
						value={paymentDetails.cvv}
						onChange={handlePaymentInputChange}
						fullWidth
					/>
				</Box>
				<Box
					component="form"
					sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}
					noValidate
				>
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
					<Button variant="contained" color="primary" onClick={handlePayment}>
						Pagar ahora
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
