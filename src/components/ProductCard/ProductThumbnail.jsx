import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductThumbnail = ({ imageurl, productId, size = 'small' }) => {
	const navigate = useNavigate();
	const SIZES = new Map([
		['small', 40],
		['medium', 80],
		['normal', 120],
		['large', 140],
	]);

	return (
		<Paper
			elevation={0}
			sx={{
				width: SIZES.get(size),
				height: SIZES.get(size),
				minWidth: SIZES.get(size),
				minHeight: SIZES.get(size),
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				margin: '0 1rem',
				borderRadius: '8px',
				boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
				cursor: 'pointer',
				overflow: 'hidden'
			}}
			onClick={() => navigate(`/products/${productId}`)}
			title="Ir al producto"
		>
			<img
				src={imageurl}
				alt={name}
				style={{ width: '100%', height: '100%', transform: 'scale(2) rotate(3deg)' }}
			/>
		</Paper>
	);
};

ProductThumbnail.propTypes = {
	imageurl: PropTypes.string,
	productId: PropTypes.number,
	size: PropTypes.string,
};

export default ProductThumbnail;
