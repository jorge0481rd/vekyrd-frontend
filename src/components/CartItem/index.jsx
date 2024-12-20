import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppContext } from '../../context/AppContext';
import PropTypes from 'prop-types';
import { getCartFromLocalStorage } from '../../helpers/cartHelpers';
import { useEffect, useState } from 'react';

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 0,
  margin: 0,
};

function CartItem({ index, itemId }) {
  const [cart] = useState(getCartFromLocalStorage());
  const item = cart.find((item) => item.id === itemId);
  const { name, price, quantity, productId } = item;
  const { updateQuantity, addOrRemoveToCart } = useAppContext();
  const [removed, setRemoved] = useState(false);
  const [localQty, setLocalQty] = useState(1);

  useEffect(() => {
    setLocalQty(quantity || 1);
  }, [quantity]);

  const handleIncDecQuantity = (productId, value) => {
    if (localQty + value > 0) {
      updateQuantity(productId, value);
      setLocalQty((prev) => prev + value);
    } else {
      updateQuantity(productId, 1);
      setLocalQty(1);
    }
  };

  if (removed) return null;

  return (
    <Box key={index}>
      <ListItem sx={listItemStyle}>
        <ListItemText primary={name} secondary={`Precio: $${price}`} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {localQty > 1 && (
            <IconButton
              color="primary"
              onClick={() => handleIncDecQuantity(productId, -1)}
            >
              <RemoveIcon />
            </IconButton>
          )}
          <Typography variant="body1">{localQty}</Typography>
          <IconButton
            color="primary"
            onClick={() => handleIncDecQuantity(productId, 1)}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <IconButton
          color="error"
          onClick={() => {
            addOrRemoveToCart(item);
            setRemoved(true);
          }}
          sx={{
            marginLeft: 2,
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
      {index < cart.length - 1 && <Divider />}
    </Box>
  );
}

CartItem.propTypes = {
  index: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired,
};

export default CartItem;
