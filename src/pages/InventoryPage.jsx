import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { apiFetchInventory, updateInventory } from '../api/api';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import NavigationButton from '../components/navigation-button';
import BlockIcon from '@mui/icons-material/Block';
import ProductThumbnail from '../components/ProductCard/ProductThumbnail';

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStock, setUpdateStock] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [search, setSearch] = useState('');

  // Filters states
  const [stockStatus, setStockStatus] = useState({
    inStock: true,
    outOfStock: false,
    lowStock: false,
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Fetch products and stock levels
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await apiFetchInventory();
        setProducts(response.data);
      } catch (err) {
        setError('Fallo al cargar el inventario.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  // Filter products based on search term and filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by search term
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      // Filter by stock status

      const matchesStockStatus =
        (stockStatus.inStock && product.stock > 0) ||
        (stockStatus.outOfStock && product.stock === 0) ||
        (stockStatus.lowStock && product.stock > 0 && product.stock < 10);

      // Filter by price range
      const matchesPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      // Apply all filters
      return matchesSearch && matchesStockStatus && matchesPriceRange;
    });
  }, [products, search, stockStatus, priceRange]);

  // Handle stock updates
  const handleStockUpdate = async (productId, blockProduct = false) => {
    try {
      let qty = parseInt(updateStock[productId]);
      if (blockProduct) qty = 0;
      const updatedProduct = await updateInventory(productId, qty);
      setSuccessMessage(`Inventario actualizado para ${updatedProduct.name}`);
      setUpdateStock((prevState) => ({ ...prevState, [productId]: '' }));
      setProducts((prevState) =>
        prevState.map((product) =>
          product.id === productId
            ? { ...product, stock: updatedProduct.stock }
            : product
        )
      );
    } catch (err) {
      setError('Error al actualizar el inventario.');
      console.log(err.message);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Inventario"
        isLoading={loading}
        isLoadingText="Cargando inventario..."
      >
        <NavigationButton href="/home" text="Inicio ►" />
      </PageHeader>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 2,
          flexDirection: 'column',
        }}
      >
        <TextField
          id="search"
          label="Buscar producto"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 2 }}>
          {/* Stock Status Filters */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={stockStatus.inStock}
                  onChange={() =>
                    setStockStatus({
                      ...stockStatus,
                      inStock: !stockStatus.inStock,
                    })
                  }
                />
              }
              label="En stock"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stockStatus.outOfStock}
                  onChange={() =>
                    setStockStatus({
                      ...stockStatus,
                      outOfStock: !stockStatus.outOfStock,
                    })
                  }
                />
              }
              label="Agotado"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stockStatus.lowStock}
                  onChange={() =>
                    setStockStatus({
                      ...stockStatus,
                      lowStock: !stockStatus.lowStock,
                    })
                  }
                />
              }
              label="Quedan pocos"
            />
          </Box>

          {/* Price Range Filter */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Precio mínimo"
              variant="outlined"
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Math.max(0, e.target.value), priceRange[1]])
              }
            />
            <TextField
              label="Precio máximo"
              variant="outlined"
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Math.max(priceRange[0], e.target.value),
                ])
              }
            />
          </Box>
        </Box>
      </Box>
      {/* Show error or success message */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, margin: '1rem 0' }}>
        {error && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography color="error">{error}</Typography>
            <Typography color="primary" variant="subtitle">
              Asegúrese de que tiene los permisos necesarios.
            </Typography>
          </Box>
        )}
        {successMessage && (
          <Typography color="success">{successMessage}</Typography>
        )}
      </Box>
      {/* Products Grid */}
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
              <Box sx={{ minHeight: '110px' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', flex: 1 }}>
                    {product.name}
                  </Typography>
                  <ProductThumbnail
                    imageurl={product.imageurl}
                    productId={product.id}
                    size="medium"
                  />
                </Box>
                <Typography variant="body1">{product.sku}</Typography>
                <Typography variant="body1" fontWeight="bold">
                  En inventario:{' '}
                  {product.stock > 0 ? (
                    product.stock
                  ) : (
                    <Box sx={{ color: 'red', display: 'inline' }}>Agotado</Box>
                  )}
                </Typography>
                <Typography variant="body2">
                  Precio: ${product.price}
                </Typography>

                {product.stock < 10 && product.stock > 0 && (
                  <Box sx={{ fontSize: '0.8rem' }}>
                    <Typography variant="body2" color="warning">
                      <b>Atención:</b> Quedan menos de 10 unidades
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Update stock input */}
              <TextField
                label="Actualizar inventario"
                type="number"
                variant="outlined"
                fullWidth
                value={updateStock[product.id] || ''}
                onChange={(e) => {
                  let qty = parseInt(e.target.value);
                  if (qty < 0) qty = 0;
                  setUpdateStock((prevState) => ({
                    ...prevState,
                    [product.id]: qty,
                  }));
                }}
                sx={{ marginTop: 1 }}
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  parseInt(e.target.value) > 0 &&
                  handleStockUpdate(product.id)
                }
              />

              {/* Action buttons */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!Number(updateStock[product.id]) > 0}
                  sx={{ marginTop: 2 }}
                  onClick={() => handleStockUpdate(product.id)}
                >
                  Actualizar inventario
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                  disabled={!Number(product.stock) > 0}
                  sx={{ marginTop: 2, flex: 1 }}
                  onClick={() => handleStockUpdate(product.id, true)}
                >
                  <BlockIcon />
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default InventoryPage;
