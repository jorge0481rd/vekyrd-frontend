import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Box } from '@mui/material';
import { ROLES } from './constants';
import AboutUsPage from './pages/AboutUsPage';
import AddNewProductPage from './pages/AddNewProductPage';
import CartPage from './pages/CartPage';
import ContactUsPage from './pages/ContactUsPage';
import ContactUsReportPage from './pages/reports/contactus/ContactUsReportPage';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import InventoryReportPage from './pages/reports/inventory';
import LoginPage from './pages/LoginPage';
import MyOrdersPage from './pages/MyOrdersPage';
import NavigationButton from './components/navigation-button';
import OrdersPage from './pages/OrdersPage';
import PageContainer from './components/PageContainer';
import PageHeader from './components/PageHeader';
import PendingOrdersReportPage from './pages/reports/pending-orders';
import ProductDetailPage from './pages/ProductDetailsPage';
import ProductsPage from './pages/ProductsPage';
import QuestionnairePage from './pages/QuestionnairePage';
import RegisterPage from './pages/RegisterPage';
import ReviewsReportPage from './pages/reports/reviews';
import SalesReportPage from './pages/reports/sales';
import ScrollToTop from './utils/scrollToTop';
import TestPage from './pages/TestPage';
import TopSellingProductsReportPage from './pages/reports/top-selling';
import UserProfilePage from './pages/ProfilePage';
import UserRolesPage from './pages/UserRolesPage';
import UsersReportPage from './pages/reports/users';
import WishlistPage from './pages/WishlistPage';
import Navbar from './components/navbar';
import Footer from './components/Footer';

ModuleRegistry.registerModules([AllCommunityModule]);

const theme = createTheme({
  palette: {
    primary: {
      main: '#ac0089',
    },
    secondary: {
      main: '#00a40f',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
  },
});

console.clear();
console.log('App.jsx: console cleared');

const App = () => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route
              path="/contactus"
              element={
                <PageContainer>
                  <PageHeader>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'flex-end',
                      }}
                    >
                      <NavigationButton href="/products" text="Productos ►" />
                    </Box>
                  </PageHeader>
                  <ContactUsPage />
                </PageContainer>
              }
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailPage />}
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute allowedRoles={[ROLES.admin, ROLES.customer]}>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/questionnare" element={<QuestionnairePage />} />
            <Route
              path="/users/roles"
              element={
                <ProtectedRoute allowedRoles={[ROLES.admin]}>
                  <UserRolesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/inventory"
              element={
                <ProtectedRoute allowedRoles={[ROLES.admin]}>
                  <InventoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/add-new-product"
              element={
                <ProtectedRoute allowedRoles={[ROLES.admin]}>
                  <AddNewProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports/sales"
              element={
                <ProtectedRoute allowedRoles={[ROLES.admin]}>
                  <SalesReportPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports/pending-orders"
              element={
                <ProtectedRoute allowedRoles={[ROLES.admin]}>
                  <PendingOrdersReportPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports/inventory"
              element={
                <ProtectedRoute allowedRoles={[ROLES.admin]}>
                  <InventoryReportPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports/top-selling"
              element={
                <ProtectedRoute allowedRoles={[ROLES.admin]}>
                  <TopSellingProductsReportPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports/users"
              element={
                <ProtectedRoute allowedRoles={[ROLES.admin]}>
                  <UsersReportPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports/reviews"
              element={
                <ProtectedRoute allowedRoles={[ROLES.admin]}>
                  <ReviewsReportPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports/contactus"
              element={
                <ProtectedRoute allowedRoles={[ROLES.admin]}>
                  <ContactUsReportPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
