import { Box, Card, Paper, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import AddRemoveProductButton from '../AddRemoveProductButton/';
import PropTypes from 'prop-types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import RatingStarsSelector from '../Reviews/RatingStarsSelector';
import WishListIcon from './WishListIcon';
import { formattedStrPrice } from '../../pages/reports/shared/helpers';

const ProductCard = memo(
	({
		product,
		isProductInCart,
		disableLinkToDetails = false,
		buyAgain = false,
	}) => {
		const { name, description, price, images, average_rating } = product;
		const [isInCart, setIsInCart] = useState(isProductInCart);

		const navigate = useNavigate();

		useEffect(() => {
			setIsInCart(isProductInCart);
		}, [isProductInCart]);

		return (
			<Card
				className="product-card-container"
				sx={{
					width: { xs: '100%', sm: '200px' },
					maxWidth: '300px',
					backgroundColor: isInCart ? '#f4ffdf' : 'white',
					borderRadius: '10px',
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					transition: 'all 0.2s ease-in-out',
					outline: 'solid 1px #eee',
				}}
				elevation={isInCart ? 1 : 0}
			>
				<Paper
					className="product-card-image"
					elevation={isInCart ? 1 : 0}
					sx={{ position: 'relative', overflow: 'hidden' }}
				>
					<Box
						sx={{
							width: { xs: '100%', sm: '200px' }
						}}
					>
						<img
							width="100%"
							height="auto"
							src={images[0]}
							alt={product.name}
							style={{
								transition: 'all 0.3s ease-in-out',
								transform: isInCart
									? 'scale(1.5) rotate(3deg) translateY(30px)'
									: 'scale(1) rotate(0deg)',
							}}
						/>
					</Box>

					{!disableLinkToDetails && (
						<Box
							className="view-details-button"
							sx={{
								width: '100%',
								height: '100%',
								position: 'absolute',
								top: 0,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								cursor: 'pointer',
								alignItems: 'center',
								transition: 'all 0.3s ease-in-out',
								backgroundColor: 'rgba(0, 0, 0, 0.3)',
								opacity: 0,
								'&:hover': {
									opacity: 0.8,
								},
							}}
							onClick={() => navigate(`/products/${product.id}`)}
						>
							<VisibilityIcon sx={{ color: 'white', fontSize: '3.5rem' }} />
							<Typography
								variant="p"
								sx={{
									color: 'white',
									fontWeight: 700,
									textAlign: 'center',
									marginBottom: '1rem',
								}}
							>
								Detalles
							</Typography>
						</Box>
					)}
				</Paper>

				<Box
					className="product-card-info"
					sx={{
						margin: '1rem',
						flex: 1,
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography
						variant="body1"
						sx={{
							fontWeight: 700,
							textAlign: 'center',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '100%',
							marginBottom: '1rem'
						}}
					>
						{name}
					</Typography>
					<RatingStarsSelector
						initialValue={parseInt(average_rating)}
						disableSelection
					/>
					<Typography
						variant="body2"
						sx={{
							color: 'text.secondary',
							textAlign: 'center',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						{description}
					</Typography>
				</Box>

				<Typography variant="h6" sx={{ margin: 1, textAlign: 'center' }}>
					${formattedStrPrice(price)}
				</Typography>
				<WishListIcon product={product} />

				<AddRemoveProductButton
					product={product}
					isAlreadyIncart={isInCart}
					onClick={() => setIsInCart((prev) => !prev)}
					buyAgain={buyAgain}
				/>
			</Card>
		);
	}
);

ProductCard.displayName = 'ProductCard';

ProductCard.propTypes = {
	product: PropTypes.object.isRequired,
	isProductInCart: PropTypes.bool.isRequired,
	disableLinkToDetails: PropTypes.bool,
	buyAgain: PropTypes.bool,
};

export default ProductCard;
