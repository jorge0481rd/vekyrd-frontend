import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getCartFromLocalStorage,
  getCartSummary,
} from '../helpers/cartHelpers';
import { apiLogin, apiLogout } from '../api/api';
import { jwtDecode } from 'jwt-decode';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState(
    localStorage.getItem('roles') || []
  );
  const [cartCount, setCartCount] = useState(getCartFromLocalStorage().length);
  const [orderDetails, setOrderDetails] = useState({
    total: 0,
    subtotal: 0,
    taxes: 0,
    shipping: 0,
  });

  const updateCartSummary = async () => {
    const cart = await getCartFromLocalStorage();
    const details = getCartSummary(cart);
    setOrderDetails(details);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') || false;
    setIsAuthenticated(isAuthenticated);

    const roles = localStorage.getItem('roles');
    if (roles) setUserRoles(roles);
  }, []);

  // if isAuthenticated is true and roles are null, set roles
  useEffect(() => {
    if (isAuthenticated && userRoles.length === 0) {
      const roles = localStorage.getItem('roles');
      setUserRoles(roles);
    }
  }, [isAuthenticated, userRoles]);

  useEffect(() => {
    const cart = getCartFromLocalStorage();
    setCartCount(cart.length);
  }, []);

  const login = async (username, password) => {
    const response = await apiLogin(username, password);
    if (response.status === 200) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      const decoded = jwtDecode(response.token);
      const roles = decoded.roles;
      localStorage.setItem('roles', roles);
      setUserRoles(roles);
    } else {
      setIsAuthenticated(false);
      localStorage.setItem('isAuthenticated', false);
    }
  };

  const logout = async () => {
    await apiLogout();
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('cart');
    localStorage.removeItem('orderDetails');
    localStorage.removeItem('token');
    localStorage.removeItem('wishlist');
    localStorage.removeItem('roles');
    window.location.href = '/login';
  };

  const getUsername = () => {
    try {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      return decoded.username;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getUserRoles = () => {
    const item = localStorage.getItem('roles');
    const userRoles = item ? item.split(',') : [];
    return userRoles;
  };

  const addOrRemoveToCart = (product) => {
    const item = localStorage.getItem('cart');
    const localStorageCart = JSON.parse(item) || [];
    const isInCart = localStorageCart.some((item) => item.id === product.id);

    const updatedCart = isInCart
      ? localStorageCart.filter((item) => item.id !== product.id)
      : [
          ...localStorageCart,
          { ...product, productId: product.id, quantity: 1 },
        ];

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartSummary();
    setCartCount(updatedCart.length);
  };

  const resetPurchase = () => {
    setCartCount(0);
    setOrderDetails({});
    localStorage.removeItem('cart');
    localStorage.removeItem('orderDetails');
  };

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

  const updateOrderDetails = (orderDetails) => {
    setOrderDetails(orderDetails);
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
  };

  return (
    <AppContext.Provider
      value={{
        addOrRemoveToCart,
        cartCount,
        getUsername,
        isAuthenticated,
        getUserRoles,
        login,
        logout,
        orderDetails,
        resetPurchase,
        setCartCount,
        updateCartSummary,
        updateOrderDetails,
        updateQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => useContext(AppContext);
