import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';

const AboutUsPage = () => {
  return (
    <PageContainer>
      <PageHeader />
      <Box
        sx={{
          margin: '0 auto',
          maxWidth: '800px',
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Bienvenido a VekyRD
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, lineHeight: 2 }}>
          En VekyRD, nos apasiona ofrecer productos para el cuidado del cabello
          de la más alta calidad en el mercado dominicano. Nos enorgullece
          ayudar a nuestros clientes a lucir y sentirse lo mejor posible al
          proporcionarles productos adaptados a sus necesidades.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4, lineHeight: 2 }}>
          Nuestra misión es simplificar el proceso de compra con una plataforma
          intuitiva y personalizada, mientras brindamos un servicio al cliente
          excepcional.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/products"
          >
            Ver Productos
          </Button>
          <Button
            variant="outlined"
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
