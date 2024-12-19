import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCartSummary } from '../helpers/cartHelpers';
import { apiLogin } from '../api/api';

const AppContext = createContext();

// AppProvider
export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    total: 0,
    subtotal: 0,
    taxes: 0,
    shipping: 0,
  });

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
  }, []);

  useEffect(() => {
    const details = getCartSummary(cart);
    setOrderDetails(details);
  }, [cart]);

  useEffect(() => {
    // check if authenticated
    const isAuthenticated =
      JSON.parse(localStorage.getItem('isAuthenticated')) || false;
    setIsAuthenticated(isAuthenticated);
  }, []);

  // authentication
  const login = async (username, password) => {
    const response = await apiLogin(username, password);
    if (response.status === 200) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
    } else {
      setIsAuthenticated(false);
      localStorage.setItem('isAuthenticated', false);
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('cart');
    localStorage.removeItem('orderDetails');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

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

  const resetPurchase = () => {
    setCart([]);
    setOrderDetails({});
    localStorage.removeItem('cart');
    localStorage.removeItem('orderDetails');
  };

  // updateQuantity
  const updateQuantity = (itemId, amount) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === itemId) {
        return { ...item, quantity: item.quantity + amount };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // removeFromCart
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.productId !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // orderDetails
  const updateOrderDetails = (orderDetails) => {
    setOrderDetails(orderDetails);
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
  };

  return (
    <AppContext.Provider
      value={{
        cart: cart ?? [],
        orderDetails,
        updateOrderDetails,
        addOrRemoveToCart,
        resetPurchase,
        updateQuantity,
        removeFromCart,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// useAppContext
export const useAppContext = () => useContext(AppContext);
