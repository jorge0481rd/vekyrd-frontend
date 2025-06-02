import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        padding: '20px 0',
        mt: 4,
        width: '100%',
        "@media print": {
          display: "none",
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Company Information */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              VekyRD
            </Typography>
            <Typography variant="body2">
              Productos para el cuidado del cabello. Inspira tu estilo con
              nosotros.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Enlaces útiles
            </Typography>
            <Box>
              <Link href="/products" color="inherit" underline="hover">
                Productos
              </Link>
            </Box>
            <Box>
              <Link href="/cart" color="inherit" underline="hover">
                Carrito
              </Link>
            </Box>
            <Box>
              <Link href="/contactus" color="inherit" underline="hover">
                Contacto
              </Link>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Síguenos
            </Typography>
            <Box>
              <Link
                href="https://www.facebook.com/profile.php?id=100064147778470"
                target="_blank"
                rel="noopener"
                color="inherit"
                underline="hover"
              >
                Facebook
              </Link>
            </Box>
            <Box>
              <Link
                href="https://www.instagram.com/vekyrd/?hl=es"
                target="_blank"
                rel="noopener"
                color="inherit"
                underline="hover"
              >
                Instagram
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          © {new Date().getFullYear()} VekyRD. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
