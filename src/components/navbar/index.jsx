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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';
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
import vekylogo from './vekylogo.png';
import { ROLES } from '../../constants';

const classes = {
	desktopButton: {
		fontSize: 'inherit',
		transition: 'all 330ms ease-in-out',
		margin: '0 4px',
		position: 'relative',
		'&::after': {
			content: '""',
			position: 'absolute',
			bottom: 0,
			left: 0,
			width: '100%',
			height: '1px',
			backgroundColor: 'rgba(255, 255, 255, 0)',
			transition: 'all 200ms ease-in-out',
			transform: 'translateY(3px)',
		},
		'&:hover': {
			'&::after': {
				backgroundColor: 'rgba(255, 255, 255, 1)',
				transform: 'translateY(0)',
			},
			color: '#fff'
		},
	}
}

const Navbar = () => {
	const { isAuthenticated, logout, cartCount, getUserRoles, getUsername } =
		useAppContext();

	const [anchorEl, setAnchorEl] = useState(null);
	const [userAnchorEl, setUserAnchorEl] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const pathname = location.pathname;
		const btns = document.querySelectorAll('.navbar a');
		btns.forEach((btn) => {
			if (btn.pathname === pathname) {
				btn.style.color = 'yellow';
			} else {
				btn.style.color = 'inherit';
			}
		});
	}, [location.pathname]);


	// Handle opening the menu
	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	// Handle closing the menu
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	// Open user menu
	const openUserMenu = (event) => {
		setUserAnchorEl(event.currentTarget);
	};

	// close user menu
	const closeUserMenu = () => {
		setUserAnchorEl(null);
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
			{/* DESKTOP Navbar */}
			<AppBar
				sx={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					display: { xs: 'none', md: 'flex' },
				}}
				className="navbar"
			>
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'end',
						flexWrap: 'wrap',
						padding: '0.7rem',
						fontSize: { xs: '10px', md: '11px' }
					}}
					className="navbar"
				>
					<img
						style={{
							width: '100px',
							height: 'auto',
							position: 'absolute',
							left: '1rem',
							cursor: 'pointer'
						}}
						src={vekylogo}
						onClick={() => navigate('/')}
						alt=""
					/>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/"
						startIcon={<HomeIcon />}
						sx={{ ...classes.desktopButton, marginLeft: "100px" }}
					>
						Inicio
					</Button>
					{isAuthenticated && (
						<>
							{getUserRoles().includes(ROLES.admin) && (
								<>
									<Button
										color="inherit"
										onClick={handleMenuClick}
										startIcon={<SettingsIcon />}
										sx={{
											fontWeight: 'bold',
											fontSize: 'inherit',
											...classes.desktopButton
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
						size="small"
						to="/about-us"
						startIcon={<Diversity3Icon />}
						sx={{ ...classes.desktopButton }}
					>
						Acerca de Nosotros
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/questionnare"
						startIcon={<ChecklistIcon />}
						sx={{ ...classes.desktopButton }}
					>
						Descubre
					</Button>
					<Button
						sx={{ color: "#ffffff", ...classes.desktopButton }}
						component={Link}
						size="small"
						to="/products"
						startIcon={<ShoppingBasketIcon />}
					>
						Productos
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/cart"
						startIcon={<ShoppingCartIcon />}
						sx={{ ...classes.desktopButton }}
					>
						<Badge badgeContent={cartCount} color="secondary">
							Carrito &nbsp;
						</Badge>
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/contactus"
						startIcon={<CallIcon />}
						sx={{ ...classes.desktopButton }}
					>
						Contáctanos
					</Button>
					{!isAuthenticated && (
						<Button
							color="inherit"
							component={Link}
							size="small"
							to="/login"
							startIcon={<LoginIcon />}
							sx={{ ...classes.desktopButton }}
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
								size="small"
								to="/wishlist"
								startIcon={<FavoriteIcon />}
								sx={{ ...classes.desktopButton }}
							>
								Lista de favoritos
							</Button>
							{getUserRoles().includes(ROLES.admin) && (
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
											size="small"
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
											size="small"
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
											size="small"
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
											size="small"
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
											size="small"
											to="/reports/users"
											onClick={handleMenuClose}
										>
											<PersonIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
											Reporte de usuarios activos
										</MenuItem>
										<MenuItem
											component={Link}
											size="small"
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
											size="small"
											to="/reports/contactus"
											onClick={handleMenuClose}
											divider
										>
											<EmailIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
											Reporte de Contáctanos
										</MenuItem>
										<MenuItem
											component={Link}
											size="small"
											to="/products/inventory"
											onClick={handleMenuClose}
										>
											Inventario
										</MenuItem>
										<MenuItem
											component={Link}
											size="small"
											to="/products/add-new-product"
											onClick={handleMenuClose}
										>
											Agregar producto
										</MenuItem>
										<MenuItem
											component={Link}
											size="small"
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
								onClick={openUserMenu}
								startIcon={<PersonIcon />}
								sx={{
									fontWeight: 'bold',
									...classes.desktopButton
								}}
							>
								Hola {`(${getUsername()})`}
							</Button>

							{/* user menu  */}
							<Menu
								anchorEl={userAnchorEl}
								open={Boolean(userAnchorEl)}
								onClose={closeUserMenu}
								MenuListProps={{
									'aria-labelledby': 'user-button',
								}}
								sx={{
									'& .MuiPopover-paper': {
										backgroundColor: '#ffffff',
										padding: '4px',
									},
								}}
							>
								<Button
									color="inherit"
									component={Link}
									to="/profile"
									startIcon={<PersonIcon />}
									sx={{ justifyContent: 'start', width: '100%' }}
								>
									Mi Perfil
								</Button>
								<Button
									color="inherit"
									component={Link}
									to="/my-orders"
									startIcon={<ShoppingBasketIcon />}
									sx={{ justifyContent: 'start', width: '100%' }}
								>
									Mis Pedidos
								</Button>
								<Button
									color="inherit"
									onClick={logout}
									startIcon={<LogoutIcon />}
									sx={{ justifyContent: 'start', width: '100%' }}
								>
									Salir ({getUsername()})
								</Button>
							</Menu>
						</>
					)}
				</Toolbar>
			</AppBar>

			{/* MOBILE Navbar */}
			<AppBar sx={{ display: { xs: 'flex', md: 'none' }, padding: 2 }}>
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<img
						style={{ width: '100px', height: 'auto' }}
						src={vekylogo}
						alt=""
						onClick={() => navigate('/')}
					/>
					<IconButton color="inherit" onClick={toggleMobileDrawer}>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			{/* MOBILE main drawer */}
			<Drawer anchor="left" open={mobileOpen} onClose={toggleMobileDrawer}>
				<Box
					sx={{
						width: 250,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'start',
						padding: '1rem',
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
						size="small"
						to="/"
						startIcon={<HomeIcon />}
					>
						Inicio
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/about-us"
						startIcon={<Diversity3Icon />}
					>
						Acerca de Nosotros
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/questionnare"
						startIcon={<ChecklistIcon />}
					>
						Descubre
					</Button>
					<Button
						color="warning"
						component={Link}
						size="small"
						to="/products"
						startIcon={<ShoppingBasketIcon />}
					>
						Productos
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
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
						size="small"
						to="/contactus"
						startIcon={<CallIcon />}
					>
						Contáctanos
					</Button>
					<DividerLine />
					{isAuthenticated && (
						<>
							{getUserRoles().includes(ROLES.admin) && (
								<Button
									color="inherit"
									component={Link}
									size="small"
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
								component={Link}
								to="/profile"
								startIcon={<PersonIcon />}
								sx={{ justifyContent: 'start', width: '100%' }}
							>
								Mi Perfil
							</Button>
							<Button
								color="inherit"
								component={Link}
								to="/my-orders"
								startIcon={<ShoppingBasketIcon />}
								sx={{ justifyContent: 'start', width: '100%' }}
							>
								Mis Pedidos
							</Button>
							<Button
								color="inherit"
								onClick={logout}
								startIcon={<LogoutIcon />}
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
							size="small"
							to="/login"
							sx={{ justifyContent: 'start', width: '100%' }}
						>
							Iniciar sesión
						</Button>
					)}
				</Box>
			</Drawer>

			{/* MOBILE tools drawer */}
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
						size="small"
						to="/reports/sales"
						sx={{ justifyContent: 'start', width: '100%' }}
					>
						<AttachMoneyIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
						Reporte de Ventas
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/reports/top-selling"
						sx={{ justifyContent: 'start', width: '100%' }}
					>
						<EmojiEventsIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
						Productos más vendidos
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
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
						size="small"
						to="/reports/inventory"
						sx={{ justifyContent: 'start', width: '100%' }}
					>
						<InventoryIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
						Reporte de inventario
					</Button>
					<DividerLine />
					<MenuItem
						component={Link}
						size="small"
						to="/products/inventory"
						onClick={handleMenuClose}
					>
						Inventario
					</MenuItem>
					<MenuItem
						component={Link}
						size="small"
						to="/products/add-new-product"
						onClick={handleMenuClose}
					>
						Agregar producto
					</MenuItem>
					<MenuItem
						component={Link}
						size="small"
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
