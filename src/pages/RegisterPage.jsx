import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRegister } from '../api/api';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!username.trim()) errors.username = 'El nombre de usuario es requerido';
    if (!email.trim()) {
      errors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'El correo electrónico no es válido';
    }
    if (!password) errors.password = 'La contraseña es requerida';
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirme su contraseña';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    return errors;
  };

  const handleRegister = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    try {
      await apiRegister(username, email, password);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Ocurrió un error');
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
          error={!!validationErrors.username}
          helperText={validationErrors.username}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!validationErrors.email}
          helperText={validationErrors.email}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!validationErrors.password}
          helperText={validationErrors.password}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Confirmar contraseña"
          variant="outlined"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!validationErrors.confirmPassword}
          helperText={validationErrors.confirmPassword}
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
