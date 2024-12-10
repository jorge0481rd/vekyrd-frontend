import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

// AppProvider
export const AppProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const cartData = JSON.parse(localStorage.getItem('cart')) || [];
		setCart(cartData);
	}, []);

	// addOrRemoveToCart
	const addOrRemoveToCart = (product) => {

		const isInCart = cart.some((item) => item.id === product.id);

		const updatedCart = isInCart
			? cart.filter((item) => item.id !== product.id)
			: [...cart, { ...product, productId: product.id, quantity: 1 }];

		setCart(updatedCart);
		localStorage.setItem('cart', JSON.stringify(updatedCart));

		return !isInCart;
	};

	// updateQuantity
	const updateQuantity = (itemId, amount) => {
		const updatedCart = cart.map(item => {
			if (item.productId === itemId) {
				return { ...item, quantity: item.quantity + amount }
			}
			return item
		})
		setCart(updatedCart)
		localStorage.setItem('cart', JSON.stringify(updatedCart))
	}

	// removeFromCart
	const removeFromCart = (itemId) => {
		const updatedCart = cart.filter(item => item.productId !== itemId)
		setCart(updatedCart)
		localStorage.setItem('cart', JSON.stringify(updatedCart))
	}

	return (
		<AppContext.Provider value={{
			cart: cart ?? [],
			addOrRemoveToCart,
			updateQuantity,
			removeFromCart
		}}>
			{children}
		</AppContext.Provider>
	);
};

AppProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

// useAppContext
export const useAppContext = () => useContext(AppContext);