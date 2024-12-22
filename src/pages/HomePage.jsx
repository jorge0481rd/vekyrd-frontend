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
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
          Bienvenido a VekyRD
        </Typography>
        <Typography variant="h5" sx={{ color: '#ffffff', marginY: 2 }}>
          Descubre los mejores productos para el cuidado de tu cabello.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{ marginTop: 2 }}
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
              title: 'Tratamientos',
              image: '/home_page_product3.jpg',
              link: '/products?category=tratamiento',
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

      {/* Footer Section */}
      <Box
        sx={{
          textAlign: 'center',
          padding: 4,
          backgroundColor: '#f8f8f8',
          borderRadius: 2,
        }}
      ></Box>
    </PageContainer>
  );
};

export default HomePage;
