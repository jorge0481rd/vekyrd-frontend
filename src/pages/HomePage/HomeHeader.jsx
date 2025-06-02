import { Box, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomeHeader = () => {
	useEffect(() => {
		const images = document.querySelectorAll('.banner-image');
		const image1 = images[1];
		const image0 = images[0];

		image0.style.transform = 'translateX(0px)';
		image0.style.opacity = 1;
		image0.imgHidden = true;

		const invertStatus = (img) => {
			img.imgHidden = !img.imgHidden;

			if (img.imgHidden) {
				img.style.transform = 'translateX(200px)';
				img.style.opacity = 0;
			} else {
				img.style.transform = 'translateX(0px)';
				img.style.opacity = 1;
			}
		};

		const interval = setInterval(() => {
			invertStatus(image0);
			invertStatus(image1);
		}, 10000);
		return () => clearInterval(interval);
	}, []);
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '60vh',
				textAlign: 'center',
				borderRadius: 2,
				marginBottom: 4,
				padding: 3,
				marginTop: '50px',
				position: 'relative',
			}}
		>
			<Box
				className="banner-image-container"
				sx={{
					width: '100%',
					height: '100%',
					position: 'absolute',
					top: 0,
					left: 0,
					overflow: 'hidden',
					borderRadius: '30px',
				}}
			>
				<img
					src="hair1.jpg"
					alt="hair"
					className="banner-image"
					style={{
						width: '100%',
						height: '100%',
						transition: 'all 0.5s ease-in-out',
						position: 'absolute',
						objectFit: 'cover',
						top: 0,
						left: 0,
					}}
				/>
				<img
					src="hair2.jpg"
					alt="hair"
					className="banner-image"
					style={{
						width: '100%',
						height: '100%',
						transition: 'all 0.5s ease-in-out',
						position: 'absolute',
						objectFit: 'cover',
						top: 0,
						left: 0,
					}}
				/>
			</Box>
			<Typography
				variant="h2"
				sx={{
					fontWeight: 'bold',
					color: '#ffffff',
					fontSize: { xs: '2rem', md: '3rem' },
					zIndex: 10,
				}}
			>
				VEKY RD
			</Typography>
			<Typography variant="h5"
				sx={{
					background: 'rgba(126, 41, 114, 0.5)',
					fontSize: { xs: '1rem', md: '1.5rem' },
					zIndex: 10,
					color: '#ffffff',
					padding: "6px 24px",
					borderRadius: "20px",
				}}
			>TU RINCÓN DE BELLEZA EN LÍNEA</Typography>

			<Typography
				variant="h5"
				sx={{
					color: '#ffffff',
					marginY: 2,
					fontSize: { xs: '1rem', md: '1.5rem' },
					zIndex: 10,
				}}
			>
				Descubre los mejores productos para el cuidado de tu cabello.
			</Typography>
			<Button
				variant="contained"
				size="medium"
				color="primary"
				sx={{ marginTop: 2, zIndex: 10 }}
				component={Link}
				to="/products"
			>
				Ver Productos
			</Button>
		</Box>
	);
};

export default HomeHeader;
