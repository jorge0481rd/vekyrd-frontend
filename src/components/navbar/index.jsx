import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Drawer,
  Box,
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
import MenuIcon from '@mui/icons-material/Menu';
import DividerLine from '../shared/DividerLine';

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

  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  // Toggle mobile drawer
  const toggleMobileDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleToolsDrawer = () => {
    setToolsOpen(!toolsOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}

      <AppBar
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          display: { xs: 'none', md: 'flex' },
        }}
      >
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
            sx={{ color: 'yellow' }}
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
              <Button
                color="inherit"
                component={Link}
                to="/wishlist"
                startIcon={<FavoriteIcon />}
              >
                Lista de favoritos
              </Button>
              {getUserRoles().includes('admin') && (
                <>
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
                      <CommentIcon
                        sx={{ fontSize: 18, marginRight: '.6rem' }}
                      />{' '}
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

      {/* Mobile Navbar */}
      <AppBar sx={{ display: { xs: 'flex', md: 'none' }, padding: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">VekyRD</Typography>
          <IconButton color="inherit" onClick={toggleMobileDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={toggleMobileDrawer}>
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
          role="presentation"
          onClick={toggleMobileDrawer}
          onKeyDown={toggleMobileDrawer}
        >
          <Typography variant="h6" sx={{ p: 2 }}>
            Menú
          </Typography>
          <Divider />
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
            color="warning"
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
          <DividerLine />
          {isAuthenticated && (
            <>
              {getUserRoles().includes('admin') && (
                <Button
                  color="inherit"
                  component={Link}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleToolsDrawer();
                  }}
                  sx={{ justifyContent: 'start', width: '100%' }}
                >
                  Herramientas
                </Button>
              )}
              <Button
                color="inherit"
                onClick={logout}
                sx={{ justifyContent: 'start', width: '100%' }}
              >
                Salir ({getUsername()})
              </Button>
            </>
          )}
          {!isAuthenticated && (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ justifyContent: 'start', width: '100%' }}
            >
              Iniciar sesión
            </Button>
          )}
        </Box>
      </Drawer>

      <Drawer
        id="tools-drawer"
        anchor="left"
        open={toolsOpen}
        onClose={toggleToolsDrawer}
      >
        <Box
          sx={{
            width: 250,
            padding: 2,
          }}
          role="presentation"
          onClick={toggleToolsDrawer}
          onKeyDown={toggleToolsDrawer}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Herramientas
          </Typography>
          <Divider />
          <Button
            color="inherit"
            component={Link}
            to="/reports/sales"
            sx={{ justifyContent: 'start', width: '100%' }}
          >
            <AttachMoneyIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
            Reporte de Ventas
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/reports/top-selling"
            sx={{ justifyContent: 'start', width: '100%' }}
          >
            <EmojiEventsIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
            Productos más vendidos
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/reports/pending-orders"
            sx={{ justifyContent: 'start', width: '100%' }}
          >
            <ProductionQuantityLimitsIcon
              sx={{ fontSize: 18, marginRight: '.6rem' }}
            />{' '}
            Órdenes pendientes
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/reports/inventory"
            sx={{ justifyContent: 'start', width: '100%' }}
          >
            <InventoryIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
            Reporte de inventario
          </Button>
          <DividerLine />
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
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
