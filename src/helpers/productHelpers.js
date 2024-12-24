import {
  apiAddToWishlist,
  apiFetchProducts,
  apiFetchWishlist,
  apiRemoveFromWishlist,
} from '../api/api';

export const addOrRemove = (product) => {
  let item = localStorage.getItem('cart');
  const cart = JSON.parse(item) || [];
  const isInCart = cart.find((item) => item.id === product.id);

  isInCart
    ? cart.filter((item) => item.id !== product.id)
    : cart.push({ ...product, quantity: 1 });

  localStorage.setItem('cart', JSON.stringify(cart));

  return !isInCart;
};

export const fetchProducts = async () => {
  try {
    const productsData = await apiFetchProducts();
    let item = localStorage.getItem('cart');
    const cartData = JSON.parse(item) || [];
    const idsAddedToCart = cartData.map((item) => item.id);
    return {
      products: productsData,
      cart: cartData,
      idsAddedToCart,
      cartCount: cartData.length,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// wishlist
export const fetchWishlist = async () => {
  try {
    const wishlistData = await apiFetchWishlist();
    return wishlistData;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
  }
};

export const addToWishlist = async (productId) => {
  try {
    const wishlistData = await apiAddToWishlist(productId);
    return wishlistData;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
  }
};

export const removeFromWishlist = async (productId) => {
  try {
    const wishlistData = await apiRemoveFromWishlist(productId);
    return wishlistData;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
  }
};
