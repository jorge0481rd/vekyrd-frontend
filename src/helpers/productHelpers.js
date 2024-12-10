import { apiFetchProducts } from '../api/api';

export const addOrRemove = (product) => {

	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	const isInCart = cart.find((item) => item.id === product.id);

	isInCart
		? cart = cart.filter((item) => item.id !== product.id)
		: cart.push({ ...product, quantity: 1 });

	localStorage.setItem('cart', JSON.stringify(cart));

	return !isInCart
};

export const fetchProducts = async () => {
	try {
		const productsData = await apiFetchProducts();
		let cartData = JSON.parse(localStorage.getItem('cart')) || [];
		const idsAddedToCart = cartData.map((item) => item.id);
		return { products: productsData, cart: cartData, idsAddedToCart, cartCount: cartData.length }
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}