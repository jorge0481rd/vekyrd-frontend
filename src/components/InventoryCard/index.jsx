import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ProductThumbnail from '../ProductCard/ProductThumbnail';
import {
	Stack,
	Box,
	Button,
	TextField,
	Typography,
	DialogActions,
	DialogContent,
} from '@mui/material';
import { updateInventory } from '../../helpers/productHelpers';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { apiChangeActiveStatus } from '../../api/api';

const classes = {
	container: {
		border: '1px solid #ccc',
		borderRadius: 2,
		width: '300px',
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
	const [openActiveStatusDialog, setOpenActiveStatusDialog] = useState(false);
	const [activeStatus, setActiveStatus] = useState(product.active);
	const img1 = product.images[0];

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

	const toggleActiveStatus = async (newStatus) => {
		const id = product.id;
		await apiChangeActiveStatus(id, newStatus);
		setActiveStatus(prev => !prev);
		setOpenActiveStatusDialog(false);
	};

	return (
		<Box sx={classes.container}>
			<Box sx={classes.header}>
				<Typography variant="h6" fontWeight={700}>
					{product.name}
					<Typography variant="body1">SKU: {product.sku}</Typography>
				</Typography>
				<ProductThumbnail
					imageurl={img1}
					productId={product.id}
					size="medium"
				/>
			</Box>
			<Typography
				variant="body1"
				sx={{ margin: 2, textAlign: 'center', fontWeight: 700 }}
			>
				{!activeStatus && 'Desactivado'}
			</Typography>
			{activeStatus && (
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
			)}
			<Typography variant="body1">
				<Box sx={{ color: 'orange', display: 'inline', margin: '1rem', opacity: (stock > 0) && (stock < 10) ? 1 : 0 }}>Quedan pocos</Box>
			</Typography>
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
				<Stack direction="row" spacing={3} sx={{ marginTop: 1 }}>
					{activeStatus && (
						<>
							<Button
								variant="text"
								size="small"
								sx={{ ...classes.actionsRowBtn, color: 'red' }}
								onClick={() => setOpenActiveStatusDialog(true)}
							>
								Desactivar
							</Button>
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
						</>
					)}
					{!activeStatus && (
						<Button
							variant="contained"
							size="small"
							sx={{
								...classes.actionsRowBtn,
								backgroundColor: 'green',
								width: '100%',
							}}
							onClick={() => setOpenActiveStatusDialog(true)}
						>
							Activar
						</Button>
					)}
				</Stack>
				{/* confirmation dialog to remove product */}
				<Dialog onClose={null} open={openActiveStatusDialog}>
					<DialogTitle>Desactivar producto</DialogTitle>
					<DialogContent>
						<Typography variant="body1" sx={{ marginBottom: 2 }}>
							¿Estás seguro de que deseas <span style={{ color: 'red', fontWeight: 'bold' }}>{activeStatus ? 'desactivar' : 'activar'}</span> este producto?
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setOpenActiveStatusDialog(false)} color="primary">
							Cancelar
						</Button>
						<Button onClick={() => toggleActiveStatus(!activeStatus)} color="primary">
							Sí
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</Box>
	);
};

InventoryCard.propTypes = {
	product: PropTypes.object,
};

export default InventoryCard;
