import { SHIPPING, TAXES } from '../constants';

export const getProductsInCart = (products, cart) => {
  return products.filter((product) =>
    cart.find((cartProduct) => cartProduct.id === product.id)
  );
};

export const getCartSummary = (cart) => {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxes = subtotal * TAXES;
  const total = subtotal + SHIPPING + taxes;
  return { subtotal, taxes, total, shipping: SHIPPING };
};

export const getCartFromLocalStorage = () => {
  const item = localStorage.getItem('cart');
  const cart = JSON.parse(item) || [];
  return cart;
};
