import { Box, Typography } from '@mui/material';

const Features = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        marginBottom: 6,
        display: 'flex',
        flexWrap: { xs: 'wrap', md: 'nowrap' },
      }}
    >
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
        <Box
          key={index}
          sx={{
            outline: 'solid 1px #ccc',
            padding: 2,
            borderRadius: 1,
            margin: 2,
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '150px',
            width: '100%',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            {feature.title}
          </Typography>
          <Typography>{feature.description}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Features;
