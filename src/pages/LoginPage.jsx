import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import NavigationButton from '../components/navigation-button';
import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';

const LoginPage = () => {
  const [username, setUsername] = useState('jorge0481rd');
  const [password, setPassword] = useState('moreno81');
  const [error, setError] = useState(null);

  const { isAuthenticated, login } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();
  const returnUrl = location.state?.returnUrl || '/products';

  const handleLogin = async (username, password) => {
    try {
      await login(username, password);
      setError(null);

      navigate(returnUrl);
    } catch (error) {
      setError(
        'Hubo un error en la autenticacion. Revise las credenciales e intente de nuevo.'
      );
      console.log(error);
    }
  };

  if (isAuthenticated)
    return (
      <PageContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: '400px',
            alignItems: 'center',
            margin: '0 auto',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
            ¡Hola, {username}!
          </Typography>
          <Typography variant="h6" gutterBottom>
            ¡Bienvenido a nuestra tienda!
          </Typography>
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/products"
              fullWidth
            >
              Ir a Productos
            </Button>
          </Box>
        </Box>
      </PageContainer>
    );

  return (
    <PageContainer>
      <PageHeader title="Iniciar sesión">
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <NavigationButton href="/products" text="Productos ►" />
        </Box>
      </PageHeader>
      <Box sx={{ margin: '0 auto', maxWidth: '400px' }}>
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin(username, password);
            }
          }}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLogin(username, password)}
            fullWidth
          >
            Aceptar
          </Button>
          <Box>
            <Typography sx={{ marginRight: 2, display: 'inline-block' }}>
              ¿No tienes cuenta?
            </Typography>
            <Link to="/register">
              <Button variant="contained" color="secondary" size="small">
                Registrate
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

LoginPage.propTypes = {
  returnUrl: PropTypes.string,
};

export default LoginPage;
