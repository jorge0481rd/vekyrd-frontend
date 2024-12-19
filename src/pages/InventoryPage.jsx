import { useState, useEffect, useMemo } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { apiFetchInventory, updateInventory } from '../api/api';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import NavigationButton from '../components/navigation-button';
import BlockIcon from '@mui/icons-material/Block';

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStock, setUpdateStock] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [search, setSearch] = useState('');

  // Fetch products and stock levels
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await apiFetchInventory();
        setProducts(response.data);
      } catch (err) {
        setError('Fallo al cargar el inventario.');
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

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

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <PageContainer>
      <PageHeader text="Inventario">
        <NavigationButton href="/home" text="Inicio ►" />
      </PageHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          id="search"
          label="Buscar producto"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, margin: '1rem 0' }}>
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && (
          <Typography color="success">{successMessage}</Typography>
        )}
      </Box>

      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
              <Box id="product-info" sx={{ minHeight: '110px' }}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">
                  Precio: ${product.price}
                </Typography>
                <Typography variant="body2">
                  En inventario:{' '}
                  {product.stock > 0 ? (
                    product.stock
                  ) : (
                    <Box sx={{ color: 'red', display: 'inline' }}>Agotado</Box>
                  )}
                </Typography>

                {product.stock < 10 && product.stock > 0 && (
                  <Box
                    sx={{
                      fontSize: '0.8rem',
                    }}
                  >
                    <Typography variant="body2" color="warning">
                      <b>Atención:</b> Quedan menos de 10 unidades
                    </Typography>
                  </Box>
                )}
              </Box>

              <TextField
                label="Actualizar inventario"
                type="number"
                variant="outlined"
                fullWidth
                value={updateStock[product.id] || ''}
                onChange={(e) => {
                  let qty = parseInt(e.target.value);
                  if (qty < 0) {
                    qty = 0;
                  }
                  setUpdateStock((prevState) => ({
                    ...prevState,
                    [product.id]: qty,
                  }));
                }}
                sx={{ marginTop: 1 }}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleStockUpdate(product.id)
                }
              />

              <Box id="action-buttons" sx={{ display: 'flex', gap: 1 }}>
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
                  title="Deshabilitar este producto"
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
