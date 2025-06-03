import { Box, Chip, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import NavigationButton from '../components/navigation-button';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { apiFetchProducts, apiFetchWishlist } from '../api/api';
import {
	getCartFromLocalStorage,
	getProductsInCart,
} from '../helpers/cartHelpers';
import { useLocation } from 'react-router-dom';
import { getRandomColorFromString } from '../utils/colors';

const ProductPage = () => {
	const [idsInCart, setIdsInCart] = useState([]);
	const [arrProducts, setArrProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [search, setSearch] = useState('');

	const location = useLocation();
	const MOSTRAR_TODOS = 'Todos';

	useEffect(() => {
		// fetch products
		const fetchData = async () => {
			setIsLoading(true);

			const products = await apiFetchProducts();

			setArrProducts(products);

			// if query param, filter products by category
			const searchParams = new URLSearchParams(location.search);
			const category = searchParams.get('category');
			filterProducts(category, products);

			//get wishlist
			try {
				const wishlist = await apiFetchWishlist();
				if (wishlist.length > 0) {
					const wishProducts = wishlist
						.map((wish) =>
							products.find((product) => product.id === wish.product_id)
						)
						.filter((product) => product !== undefined);
					// save to local storage
					const arrWishlist = wishProducts.map((product) => product.id);
					localStorage.setItem('wishlist', arrWishlist);
					// also update products
					products.forEach((product) => {
						product.isInWishlist = arrWishlist.includes(product.id);
					});

					setArrProducts(products);
				}
			} catch (error) {
				console.error('Error fetching wishlist:', error);
			}

			//finally
			setIsLoading(false);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const cart = getCartFromLocalStorage();
		const productsInCart = getProductsInCart(arrProducts, cart);
		const ids = productsInCart.map((product) => product.id);
		setIdsInCart(ids);
	}, [arrProducts]);

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const category = searchParams.get('category');

		setSearch(category || '');
		filterProducts(category, arrProducts);
	}, [location.search]);

	const filterProducts = (searchTerm, arrProducts, category = null) => {
		let filtered = arrProducts.filter((product) =>
			category && category != MOSTRAR_TODOS
				? product.category === category
				: true
		);

		if (searchTerm) {
			filtered = filtered.filter((product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		setFilteredProducts(filtered);
	};

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearch(value);
		filterProducts(value, arrProducts);
	};

	const handleCategoryFilter = (category, searchTerm) => {
		filterProducts(searchTerm, arrProducts, category);
	};

	const generateCategories = () => {
		const arr = arrProducts.map((product) => product.category);
		const uniqueCategories = [...new Set(arr)];

		return (
			<Box
				sx={{
					display: 'flex',
					gap: 4,
					margin: '1rem 0 2rem',
					borderBottom: 'dashed 1px #ccc',
					borderRadius: '10px',
					padding: '1rem',
					boxSizing: 'border-box',
					justifyContent: 'center',
					flexWrap: 'wrap',
				}}
			>
				<Chip
					sx={{ background: 'white', outline: 'solid 1px #ccc' }}
					label={MOSTRAR_TODOS}
					onClick={() => handleCategoryFilter(MOSTRAR_TODOS, search)}
				/>
				{uniqueCategories.map((category) => (
					<Chip
						sx={{ background: getRandomColorFromString(category, search) }}
						key={category}
						label={category}
						onClick={() => handleCategoryFilter(category, search)}
					/>
				))}
			</Box>
		);
	};

	return (
		<PageContainer>
			<PageHeader
				title="Nuestros Productos"
				subtitle="¡ES TIEMPO DE UN CABELLO HERMOSO!"
				isLoading={isLoading}
				isLoadingText="Cargando productos..."
			>
				<NavigationButton href="/cart" text="Carrito ►" />
			</PageHeader>

			{/* Search box */}
			{!isLoading && (
				<Box
					sx={{
						margin: '1rem  auto 2rem',
						width: { xs: '350px', md: '400px' },
						maxWidth: { xs: '100%', md: '400px' },
						background: 'white',
					}}
				>
					<TextField
						id="search"
						label="Buscar producto"
						variant="outlined"
						fullWidth
						value={search}
						onChange={handleSearchChange}
					/>
				</Box>
			)}

			{/* Categories */}
			{generateCategories()}

			{/* products container */}
			<Box
				id="product-cards-container"
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 4,
					minHeight: '500px',
					justifyContent: 'center',
				}}
			>
				{!isLoading &&
					filteredProducts.map((product) => {
						const isProductInCart = idsInCart.includes(product.id);
						return (
							<ProductCard
								key={product.id}
								product={product}
								isProductInCart={isProductInCart}
							/>
						);
					})}
			</Box>
		</PageContainer>
	);
};

export default ProductPage;
