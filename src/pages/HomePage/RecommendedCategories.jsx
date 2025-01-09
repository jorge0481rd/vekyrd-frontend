import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

const RecommendedCategories = () => {
  return (
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
  );
};

export default RecommendedCategories;
