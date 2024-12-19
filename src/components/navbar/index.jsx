import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const { isAuthenticated, logout, cart } = useAppContext();

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  return (
    <AppBar sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          VekyRD
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/products">
          Productos
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartCount} color="secondary">
            Carrito &nbsp;
          </Badge>
        </Button>
        {!isAuthenticated && (
          <Button color="inherit" component={Link} to="/login">
            Iniciar session
          </Button>
        )}

        {/* iAuthenticated  */}
        {isAuthenticated && (
          <>
            <Button color="inherit" component={Link} to="/inventory">
              Inventario
            </Button>
            <Button
              color="inherit"
              component={Link}
              onClick={logout}
              title="Cerrar sesión"
            >
              Salir
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
