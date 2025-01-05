import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import useProducts from '../hooks/useProducts';
import DisplayRandomProducts from '../components/DisplayRandomProducts';
import ContactUsPage from './ContactUsPage';

const HomePage = () => {
  const { getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <PageContainer>
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
          background: 'cornflowerblue',
          backgroundImage: 'url("/hair.jpg")',
          backgroundSize: 'cover',
          backgroundColor: '#000000',
          backgroundPosition: { xs: '-800px', md: 'center' },
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        <Box
          id="background-image-gradient"
          sx={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundImage:
              'linear-gradient(to left, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.0) 80%)',
          }}
        ></Box>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: '#ffffff',
            fontSize: { xs: '2rem', md: '3rem' },
            zIndex: 10,
          }}
        >
          Bienvenido a VekyRD
        </Typography>
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

      {/* Features Section */}
      <Box sx={{ textAlign: 'center', marginBottom: 6 }}>
        <Grid container spacing={4}>
          {[
            {
              title: 'Calidad Garantizada',
              description:
                'Los mejores ingredientes para el cuidado de tu cabello.',
            },
            {
              title: 'Recomendaciones Personalizadas',
              description: 'Descubre los productos perfectos para ti.',
            },
            {
              title: 'Envíos Rápidos',
              description: 'Recibe tus productos en tiempo récord.',
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '150px',
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold', marginBottom: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Random products Section */}
      <Box sx={{ marginBottom: 6 }}>
        <DisplayRandomProducts quantity={3} />
      </Box>

      {/* Product Categories Section */}
      <Box sx={{ textAlign: 'center', marginBottom: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
          Categorías Destacadas
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'Shampoos',
              image: '/home_page_product1.jpg',
              link: '/products?category=shampoo',
            },
            {
              title: 'Acondicionadores',
              image: '/home_page_product2.jpg',
              link: '/products?category=acondicionador',
            },
            {
              title: 'Sprays',
              image: '/home_page_product3.jpg',
              link: '/products?category=spray',
            },
          ].map((category, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={category.image}
                  alt={category.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {category.title}
                  </Typography>
                  <Button
                    variant="outlined"
                    href={category.link}
                    sx={{ marginTop: 2 }}
                  >
                    Ver Más
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Contact us Section */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', marginBottom: 4, textAlign: 'center' }}
      >
        Contáctanos
      </Typography>
      <ContactUsPage />
    </PageContainer>
  );
};

export default HomePage;
