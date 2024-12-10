import { Box, Divider, IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppContext } from '../../context/AppContext';
import PropTypes from 'prop-types';

const listItemStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: 0,
	margin: 0,
};


function CartItem({ index, itemId }) {
	const { cart } = useAppContext();
	const item = cart.find(item => item.id === itemId);

	const { name, price, quantity, productId } = item;
	const { updateQuantity, removeFromCart } = useAppContext()

	return (<Box key={index}>
		<ListItem sx={listItemStyle}>
			<ListItemText primary={name} secondary={`Precio: $${price}`} />
			<Box sx={{
				display: 'flex',
				alignItems: 'center'
			}}>
				<IconButton color="primary" onClick={() => updateQuantity(productId, -1)} disabled={quantity <= 1}>
					<RemoveIcon />
				</IconButton>
				<Typography variant="body1">{quantity}</Typography>
				<IconButton color="primary" onClick={() => updateQuantity(productId, 1)}>
					<AddIcon />
				</IconButton>
			</Box>
			<IconButton color="error" onClick={() => removeFromCart(productId)} sx={{
				marginLeft: 2
			}}>
				<DeleteIcon />
			</IconButton>
		</ListItem>
		{index < cart.length - 1 && <Divider />}
	</Box>);
}

CartItem.propTypes = {
	index: PropTypes.number.isRequired,
	itemId: PropTypes.number.isRequired,
}

export default CartItem