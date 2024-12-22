import { Box, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import NavigationButton from '../components/navigation-button';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { apiFetchProducts } from '../api/api';
import {
  getCartFromLocalStorage,
  getProductsInCart,
} from '../helpers/cartHelpers';
import { useLocation } from 'react-router-dom';

const ProductPage = () => {
  const [idsInCart, setIdsInCart] = useState([]);
  const [arrProducts, setArrProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const products = await apiFetchProducts();
        setArrProducts(products);
        setFilteredProducts(products);
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
    filterProducts(category);
  }, [location.search]);

  const filterProducts = (searchTerm) => {
    let filtered = arrProducts;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    console.log({ searchTerm, ...filtered });

    setFilteredProducts(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    filterProducts(value, new URLSearchParams(location.search).get('category'));
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
      <Box sx={{ margin: '1rem auto', maxWidth: '400px' }}>
        <TextField
          id="search"
          label="Buscar producto"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
      </Box>

      {/* products container */}
      <Box
        id="product-cards-container"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, minHeight: '500px' }}
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <div>No products found.</div>
        ) : (
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
          })
        )}
      </Box>
    </PageContainer>
  );
};

export default ProductPage;
