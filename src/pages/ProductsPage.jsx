import { Box, Grid, TextField } from '@mui/material';
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
import { useAppContext } from '../context/AppContext';

const ProductPage = () => {
  const [idsInCart, setIdsInCart] = useState([]);
  const [arrProducts, setArrProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const location = useLocation();
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const products = await apiFetchProducts();

        if (isAuthenticated) {
          const wishlist = await apiFetchWishlist();

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
        }

        setArrProducts(products);

        // if query param, filter products by category
        const searchParams = new URLSearchParams(location.search);
        const category = searchParams.get('category');
        filterProducts(category, products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
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

  const filterProducts = (searchTerm, arrProducts) => {
    let filtered = arrProducts;

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
            margin: '1rem  auto 4rem',
            maxWidth: '400px',
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

      {/* products container */}
      <Box
        id="product-cards-container"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, minHeight: '500px' }}
      >
        {!isLoading &&
          filteredProducts.map((product) => {
            const isProductInCart = idsInCart.includes(product.id);
            return (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard
                  product={product}
                  isProductInCart={isProductInCart}
                />
              </Grid>
            );
          })}
      </Box>
    </PageContainer>
  );
};

export default ProductPage;
