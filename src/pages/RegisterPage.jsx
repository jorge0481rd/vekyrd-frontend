import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRegister } from '../api/api';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';

const RegisterPage = () => {
  const [username, setUsername] = useState('jorge0481rd');
  const [email, setEmail] = useState('jorge0481rd@gmail.com');
  const [password, setPassword] = useState('moreno81');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await apiRegister(username, email, password);
      navigate('/login');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <PageContainer>
      <PageHeader title="Registro"></PageHeader>

      <Box sx={{ margin: '0 auto', maxWidth: '400px' }}>
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleRegister}
            fullWidth
          >
            Aceptar
          </Button>
          <Typography variant="body1">
            <Box sx={{ marginRight: 2, display: 'inline-block' }}>
              ¿Ya tienes cuenta?
            </Box>
            <Link to="/login">
              <Button variant="contained" color="secondary" size="small">
                Iniciar sesión
              </Button>
            </Link>
          </Typography>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default RegisterPage;
