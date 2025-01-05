import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ProductThumbnail from '../ProductCard/ProductThumbnail';
import { Box, Button, TextField, Typography } from '@mui/material';
import { updateInventory } from '../../helpers/productHelpers';

const classes = {
  container: {
    border: '1px solid #ccc',
    borderRadius: 2,
    width: '350px',
    margin: 2,
    background: '#ffffff',
  },
  header: {
    minHeight: '110px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f5f5f5',
    padding: '1rem 1rem 0.5rem',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0px',
      left: 0,
      height: '4px',
      width: '100%',
      background: '#ccc',
    },
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 1,
    padding: '1rem 1rem 0.5rem',
  },
  actions: {
    padding: '1rem',
    display: 'flex',
    gap: 1,
    flexDirection: 'column',
  },

  actionsRow: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
  },
  actionsRowBtn: { transform: 'translateY(4px)' },
};

const InventoryCard = ({ product }) => {
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(10);
  const [disableSave, setDisableSave] = useState(true);

  useEffect(() => {
    setStock(product.stock);
    setPrice(product.price);
  }, [product.price, product.stock]);

  const onChangeStock = (e) => {
    setStock(e.target.value);
    setDisableSave(false);
  };

  const onChangePrice = (e) => {
    setPrice(e.target.value);
    setDisableSave(false);
  };

  const handleClick = async (productId, stock, price) => {
    await updateInventory(productId, stock, price);
    setDisableSave(true);
  };

  return (
    <Box sx={classes.container}>
      <Box sx={classes.header}>
        <Typography variant="h6" fontWeight={700}>
          {product.name}
          <Typography variant="body1">SKU: {product.sku}</Typography>
        </Typography>
        <ProductThumbnail
          imageurl={product.imageurl1}
          productId={product.id}
          size="medium"
        />
      </Box>
      <Box sx={classes.info}>
        <Typography variant="body1">
          En stock:
          {product.stock > 0 ? (
            product.stock
          ) : (
            <Box sx={{ color: 'red', display: 'inline' }}>Agotado</Box>
          )}
        </Typography>
        <Typography variant="body2">Precio: ${product.price}</Typography>
      </Box>
      <Box sx={classes.actions}>
        <TextField
          label="cambiar precio"
          variant="outlined"
          value={price}
          onChange={onChangePrice}
          sx={{ marginTop: 1 }}
        />
        <TextField
          label="cambiar stock"
          variant="outlined"
          type="number"
          value={stock}
          onChange={onChangeStock}
          sx={{ marginTop: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={classes.actionsRowBtn}
          onClick={() => handleClick(product.id, stock, price)}
          disabled={disableSave}
        >
          Guardar cambios
        </Button>
      </Box>
    </Box>
  );
};

InventoryCard.propTypes = {
  product: PropTypes.object,
};

export default InventoryCard;
