import { useState } from 'react';
import { apiFetchProducts } from '../api/api';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState([]);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const productsData = await apiFetchProducts();
      productsData && setProducts(productsData);

      const item = localStorage.getItem('cart');
      const cartData = JSON.parse(item) || [];
      const idsAddedToCart = cartData.map((item) => item.id);
      idsAddedToCart && setAddedToCart(idsAddedToCart);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { products, addedToCart, isLoading, getProducts, setAddedToCart };
};

export default useProducts;
