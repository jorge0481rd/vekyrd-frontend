import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import useDeviceType from '../utils/isMobile';

const AboutUsPage = () => {
	const { isMobile } = useDeviceType();
	return (
		<PageContainer>
			<PageHeader />
			<Box
				sx={{
					margin: { sx: '0.5rem', md: '4rem' },
					maxWidth: '1000px',
					textAlign: 'center',
					padding: { sx: '0.5rem', md: '3rem' },
					backgroundColor: '#ffffff',
					borderRadius: '8px',
					boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
				}}
			>
				<Typography variant="h2" gutterBottom fontWeight={700}>
					Bienvenido a VekyRD
				</Typography>
				<Typography
					variant="body1"
					sx={{
						marginBottom: 2,
						lineHeight: 2,
						fontSize: '1.3rem',
						fontWeight: 700,
					}}
				>
					En VekyRD, nos apasiona cuidar de tu cabello y realzar tu confianza.
					Somos una empresa dominicana comprometida a ofrecer productos para el
					cuidado del cabello de la más alta calidad, diseñados para satisfacer
					las necesidades específicas de cada cliente.
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						gap: 2,
						flexWrap: 'wrap',
						marginBottom: 4,
					}}
				>
					<img
						src="/img/social-media/linea.png"
						alt=""
						width={320}
						height={320}
					/>
					<img
						src="/img/social-media/shampoo.png"
						alt=""
						width={320}
						height={320}
					/>
				</Box>
				<Typography variant="h4" gutterBottom>
					Nuestra Visión
				</Typography>
				<Typography variant="body1" sx={{ marginBottom: 2, lineHeight: 2 }}>
					Desde nuestros humildes comienzos, hemos trabajado con un único
					propósito: hacer que cada persona encuentre el producto perfecto para
					destacar su estilo único. Nuestra experiencia y dedicación nos
					permiten brindar soluciones efectivas, desde productos clásicos hasta
					innovaciones modernas.
				</Typography>
				<Typography variant="body1" sx={{ marginBottom: 4, lineHeight: 2 }}>
					Creemos en la importancia de una experiencia de compra sencilla y
					personalizada. Con una plataforma fácil de usar y un enfoque en el
					cliente, estamos aquí para garantizar que disfrutes de una atención de
					primera y productos de calidad incomparable.
				</Typography>
				<Typography variant="h4" gutterBottom>
					Nuestra Promesa
				</Typography>
				<Typography variant="body1" sx={{ lineHeight: 2 }}>
					En VekyRD, nos esforzamos por:
				</Typography>
				<ul
					style={{
						textAlign: 'left',
						display: 'inline-block',
						marginBottom: '2rem',
					}}
				>
					<li>
						Ofrecer una variedad de productos cuidadosamente seleccionados.
					</li>
					<li>Escuchar y adaptarnos a las necesidades de nuestros clientes.</li>
					<li>
						Promover prácticas sostenibles y responsables con el medio ambiente.
					</li>
				</ul>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						gap: 2,
					}}
				>
					<Button
						variant="contained"
						size={isMobile ? 'small' : 'large'}
						color="primary"
						component={Link}
						to="/products"
					>
						Ver Productos
					</Button>
					<Button
						variant="outlined"
						size={isMobile ? 'small' : 'large'}
						color="secondary"
						component={Link}
						to="/contactus"
					>
						Contáctanos
					</Button>
				</Box>
			</Box>
		</PageContainer>
	);
};

export default AboutUsPage;
