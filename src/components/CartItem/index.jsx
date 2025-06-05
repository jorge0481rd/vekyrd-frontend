import {
	Box,
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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductThumbnail from '../ProductCard/ProductThumbnail';


const listItemStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: 0,
	margin: 0,
};

function CartItem({ index, item }) {
	const { name, price, quantity, productId, images } = item;
	const img1 = images[0]
	const { updateQuantity, addOrRemoveToCart } = useAppContext();
	const [removed, setRemoved] = useState(false);
	const [localQty, setLocalQty] = useState(1);
	const navigate = useNavigate();

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
				<ProductThumbnail imageurl={img1} productId={productId} />
				<ListItemText
					primary={name}
					secondary={`Precio: $${price}`}
					sx={{
						cursor: 'pointer',
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.1)',
						},
					}}
					onClick={() => navigate(`/products/${productId}`)}
				/>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<IconButton
						color="primary"
						onClick={() => handleIncDecQuantity(productId, -1)}
						disabled={localQty === 1}
					>
						<RemoveIcon />
					</IconButton>

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
		</Box>
	);
}

CartItem.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired,
};

export default CartItem;
