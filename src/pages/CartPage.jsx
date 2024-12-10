import { Box, Button, Divider, List, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import { useAppContext } from '../context/AppContext';
import formatPrice from '../utils/formatPrice';
import CartItem from '../components/CartItem';
import { getCartSummary } from '../helpers/cartHelpers';



const CartPage = () => {
	const [orderSummary, setOrderSummary] = useState([]);
	const [isEmptyCart, setIsEmptyCart] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	
	const { cart } = useAppContext();
	console.log(cart)


	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			const { subtotal, taxes, total, shipping } = await getCartSummary(cart)
			setOrderSummary(
				{
					subtotal,
					taxes,
					shipping,
					total
				}
			);

			setIsLoading(false)
		}

		fetchData()
	}, [])


	useEffect(() => {
		setIsEmptyCart(cart.length === 0);
	}, [cart])
	
	const getFormattedValues = () => {
		const subtotal = formatPrice(orderSummary.subtotal);
		const taxes = formatPrice(orderSummary.taxes);
		const shipping = formatPrice(orderSummary.shipping);
		const total = formatPrice(orderSummary.total);
		return { subtotal, taxes, shipping, total };
	}


	if (isEmptyCart && !isLoading) return <PageContainer>
		<PageHeader text="Carrito" isLoading={isLoading}></PageHeader>
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
			<Paper elevation={0} sx={{ width: '200px', height: '200px', backgroundColor: 'white', borderRadius: '10px', transform: "translateX(-25px)" }}>
				<img style={{ width: "100%" }} src="/empty_cart.jpg" alt="Carrito vacío" />
			</Paper>
			<Typography variant="h5" gutterBottom>Su carrito está vacío</Typography>
			<Typography variant="body1">Puede agregar productos a su carrito para poder realizar un pedido.</Typography>
			<Button component={Link} variant="contained" to="/products">Ver Productos</Button>
		</Box>
	</PageContainer>

	return (
		<PageContainer>
			<PageHeader text="Carrito" isLoading={isLoading}>
				<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
					<Button component={Link} variant="contained" to="/products">◄ Productos</Button>
					<Button component={Link} variant="contained" to="/orders">Pago ►</Button>
				</Box>
			</PageHeader>

			<Typography variant="h5" gutterBottom textAlign="center">Resumen del pedido</Typography>
			<Box id="order-summary-container" sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '600px', margin: 'auto' }}>
				<List>
					{cart.map((item, index) => (
						<CartItem
							index={index}
							key={item.id}
							const itemId={item.id}
						/>
					))}
				</List>

				<Divider sx={{ margin: 2, }} />
				{
					<>
							<Box sx={{ display: 'flex', justifyContent: 'end'}}>
								<Typography sx={{ width: '100px' }}>Subtotal</Typography>
								<Typography sx={{ width: '100px', textAlign: 'right' }}>{getFormattedValues().subtotal}</Typography>
							</Box>
							<Box sx={{ display: 'flex', justifyContent: 'end'}}>
								<Typography sx={{ width: '100px' }}>Impuestos</Typography>
								<Typography sx={{ width: '100px', textAlign: 'right' }}>{getFormattedValues().taxes}</Typography>
							</Box>
							<Box sx={{ display: 'flex', justifyContent: 'end'}}>
								<Typography sx={{ width: '100px' }}>Envío</Typography>
								<Typography sx={{ width: '100px', textAlign: 'right' }}>{getFormattedValues().shipping}</Typography>
							</Box>
							<Box sx={{ display: 'flex', justifyContent: 'end',  marginTop: 2, paddingTop: 2, borderTop: '1px solid black', fontWeight: 'bold' }}>
								<Typography sx={{ width: '100px' }}>Total</Typography>
								<Typography sx={{ width: '100px', textAlign: 'right' }}>{getFormattedValues().total}</Typography>
							</Box>
						</>
				}
			</Box>
		</PageContainer >
	);
};

export default CartPage;



