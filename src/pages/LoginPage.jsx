import { Box, Button, TextField, Typography } from '@mui/material';
import{ useState } from 'react';
import { Link } from 'react-router-dom';
import { apiLogin } from '../api/api';
import PageContainer from '../components/PageContainer';

const LoginPage = () => {
	const [username, setUsername] = useState('jorge0481rd');
	const [password, setPassword] = useState('moreno81');
	const [error, setError] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);

	const handleLogin = async () => {
		try {
			await apiLogin(username, password);
			setLoggedIn(true)
		} catch (error) {
			setError("Hubo un error en la autenticacion. Revise las credenciales e intente de nuevo.");
		}
	};

	if (loggedIn) return <PageContainer>
		<Typography variant="h4" gutterBottom>¡Hola, {username}!</Typography>
		<Typography variant="h6" gutterBottom>¡Bienvenido a nuestra tienda!</Typography>
		<Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
			<Button
				variant="contained"
				color="primary"
				component={Link}
				to="/products"
				fullWidth
			>Ir a Productos</Button>
		</Box>
	</PageContainer>


	return (
		<PageContainer>
			<Typography variant="h4" gutterBottom>Iniciar sesión</Typography>
			<TextField
				label="Usuario"
				variant="outlined"
				fullWidth
				value={username}
				onChange={(e) => setUsername(e.target.value)}
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
			<Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleLogin}
					fullWidth
				>
					Aceptar
				</Button>
				<Box>
					<Typography sx={{ marginRight: 2, display: "inline-block" }}>¿No tienes cuenta?</Typography>
					<Link to="/register">
						<Button variant="contained" color="primary" size='small'>
							Registrate
						</Button>
					</Link>
				</Box>
			</Box>
		</PageContainer>
	);
};

export default LoginPage;
