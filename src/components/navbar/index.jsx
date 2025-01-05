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
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import CommentIcon from '@mui/icons-material/Comment';

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
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'end',
          flexWrap: 'wrap',
        }}
      >
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
        {isAuthenticated && (
          <>
            {getUserRoles().includes('admin') && (
              <>
                <Button
                  color="inherit"
                  onClick={handleMenuClick}
                  startIcon={<SettingsIcon />}
                  sx={{
                    color: 'yellow',
                    fontWeight: 'bold',
                  }}
                >
                  Herramientas
                </Button>
              </>
            )}
          </>
        )}
        <Button
          color="inherit"
          component={Link}
          to="/about-us"
          startIcon={<Diversity3Icon />}
        >
          Acerca de Nosotros
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/questionnare"
          startIcon={<ChecklistIcon />}
        >
          Descubre
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
        <Button
          color="inherit"
          component={Link}
          to="/contactus"
          startIcon={<CallIcon />}
        >
          Contáctanos
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
                  component={Link}
                  to="/wishlist"
                  startIcon={<FavoriteIcon />}
                >
                  Lista de favoritos
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    'aria-labelledby': 'herramientas-button',
                  }}
                  sx={{
                    '& .MuiPopover-paper': {
                      backgroundColor: '#ffffff',
                      padding: '4px',
                    },
                  }}
                >
                  <MenuItem
                    component={Link}
                    to="/reports/sales"
                    onClick={handleMenuClose}
                  >
                    <AttachMoneyIcon
                      sx={{ fontSize: 18, marginRight: '.6rem' }}
                    />{' '}
                    Reporte de ventas
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/reports/top-selling"
                    onClick={handleMenuClose}
                  >
                    <EmojiEventsIcon
                      sx={{ fontSize: 18, marginRight: '.6rem' }}
                    />{' '}
                    Productos más vendidos
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/reports/pending-orders"
                    onClick={handleMenuClose}
                  >
                    <ProductionQuantityLimitsIcon
                      sx={{ fontSize: 18, marginRight: '.6rem' }}
                    />{' '}
                    Órdenes pendientes
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/reports/inventory"
                    onClick={handleMenuClose}
                    divider
                  >
                    <InventoryIcon
                      sx={{ fontSize: 18, marginRight: '.6rem' }}
                    />{' '}
                    Reporte de inventario
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/reports/users"
                    onClick={handleMenuClose}
                  >
                    <PersonIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
                    Reporte de usuarios activos
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/reports/reviews"
                    onClick={handleMenuClose}
                  >
                    <CommentIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
                    Reporte de comentarios
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/reports/contactus"
                    onClick={handleMenuClose}
                    divider
                  >
                    <EmailIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
                    Reporte de Contáctanos
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/products/inventory"
                    onClick={handleMenuClose}
                  >
                    Inventario
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/products/add-new-product"
                    onClick={handleMenuClose}
                  >
                    Agregar producto
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/users/roles"
                    onClick={handleMenuClose}
                  >
                    Permisos de usuario
                  </MenuItem>
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
