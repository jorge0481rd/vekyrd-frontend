import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { apiFetchInventory, updateInventory } from '../api/api';

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStock, setUpdateStock] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch products and stock levels
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await apiFetchInventory();
        console.log('response', response);
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

  // Handle stock updates
  const handleStockUpdate = async (productId) => {
    try {
      const qty = parseInt(updateStock[productId]);
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
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Inventario
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {successMessage && (
        <Typography color="success">{successMessage}</Typography>
      )}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1">Precio: ${product.price}</Typography>
              <Typography variant="body2">
                En inventario: {product.stock}
              </Typography>

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
              />

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
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InventoryPage;
