import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const { isAuthenticated, logout, cartCount, getUserRoles, getUsername } =
    useAppContext();

  const [anchorEl, setAnchorEl] = useState(null);

  // Handle opening the menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          VekyRD
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          startIcon={<HomeIcon />}
        >
          Inicio
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/products"
          startIcon={<ShoppingBasketIcon />}
        >
          Productos
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/cart"
          startIcon={<ShoppingCartIcon />}
        >
          <Badge badgeContent={cartCount} color="secondary">
            Carrito &nbsp;
          </Badge>
        </Button>
        {!isAuthenticated && (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            startIcon={<LoginIcon />}
          >
            Iniciar session
          </Button>
        )}

        {/* iAuthenticated  */}
        {isAuthenticated && (
          <>
            {getUserRoles().includes('admin') && (
              <>
                <Button
                  color="inherit"
                  onClick={handleMenuClick}
                  startIcon={<SettingsIcon />}
                >
                  Herramientas
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    'aria-labelledby': 'herramientas-button',
                  }}
                >
                  <MenuItem
                    component={Link}
                    to="/products/inventory"
                    onClick={handleMenuClose}
                  >
                    Inventario
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/users/roles"
                    onClick={handleMenuClose}
                  >
                    Permisos de usuario
                  </MenuItem>
                  {/* You can add more admin tools here */}
                </Menu>
              </>
            )}
            <Button
              color="inherit"
              component={Link}
              onClick={logout}
              title="Cerrar sesión"
              startIcon={<LogoutIcon />}
            >
              Salir {`(${getUsername()})`}
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
