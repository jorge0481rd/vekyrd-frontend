import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getCartFromLocalStorage,
  getCartSummary,
} from '../helpers/cartHelpers';
import { apiLogin } from '../api/api';

const AppContext = createContext();

// AppProvider
export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(getCartFromLocalStorage().length);
  const [orderDetails, setOrderDetails] = useState({
    total: 0,
    subtotal: 0,
    taxes: 0,
    shipping: 0,
  });

  const updateCartSummary = () => {
    const cart = getCartFromLocalStorage();
    const details = getCartSummary(cart);
    setOrderDetails(details);
  };

  useEffect(() => {
    // check if authenticated
    const isAuthenticated =
      JSON.parse(localStorage.getItem('isAuthenticated')) || false;
    setIsAuthenticated(isAuthenticated);
  }, []);

  useEffect(() => {
    const cart = getCartFromLocalStorage();
    setCartCount(cart.length);
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
    const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
    const isInCart = localStorageCart.some((item) => item.id === product.id);

    const updatedCart = isInCart
      ? localStorageCart.filter((item) => item.id !== product.id)
      : [
          ...localStorageCart,
          { ...product, productId: product.id, quantity: 1 },
        ];

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setCartCount(updatedCart.length);
  };

  const resetPurchase = () => {
    setCartCount(0);
    setOrderDetails({});
    localStorage.removeItem('cart');
    localStorage.removeItem('orderDetails');
  };

  // updateQuantity
  const updateQuantity = (itemId, amount) => {
    const cart = getCartFromLocalStorage();
    const updatedCart = cart.map((item) => {
      if (item.productId === itemId) {
        return { ...item, quantity: item.quantity + amount };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartSummary();
  };

  // orderDetails
  const updateOrderDetails = (orderDetails) => {
    setOrderDetails(orderDetails);
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
  };

  return (
    <AppContext.Provider
      value={{
        orderDetails,
        updateOrderDetails,
        updateCartSummary,
        addOrRemoveToCart,
        resetPurchase,
        updateQuantity,
        login,
        logout,
        isAuthenticated,
        cartCount,
        setCartCount,
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
