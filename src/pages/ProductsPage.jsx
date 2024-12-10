import { Box, Grid } from '@mui/material';
import  { useEffect, useState } from 'react';
import NavigationButton from '../components/navigation-button';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';
import { apiFetchProducts } from '../api/api';
import { getProductsInCart } from '../helpers/cartHelpers';


const ProductPage = () => {
	const [idsInCart, setIdsInCart] = useState([])
	const [arrProducts, setArrProducts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const { cart } = useAppContext()

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			const products = await apiFetchProducts()
			setArrProducts(products)
		}

		fetchData()
	}, [])

	useEffect(() => {
		const productsInCart = getProductsInCart(arrProducts, cart)
		const ids = productsInCart.map((product) => product.id)
		setIdsInCart(ids)
		setIsLoading(false)
	}, [arrProducts, cart])


	return (
		<PageContainer>
			<PageHeader text="Productos" isLoading={isLoading}>
				<NavigationButton href="/cart" text="Carrito ►" />
			</PageHeader>
			<Box id="product-cards-container" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
				{arrProducts.map((product) => {
					const isProductInCart = idsInCart.includes(product.id);
					return (
						<Grid item xs={12} sm={6} md={4} key={product.id}>
							<ProductCard
								product={product}
								isProductInCart={isProductInCart}
							/>
						</Grid>
					)
				})}
			</Box>
		</PageContainer>
	);
};

export default ProductPage;
