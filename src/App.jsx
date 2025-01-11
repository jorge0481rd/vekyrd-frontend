import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import InventoryPage from './pages/InventoryPage';
import ProductDetailPage from './pages/ProductDetailsPage';
import { ROLES } from './constants';
import UserRolesPage from './pages/UserRolesPage';
import WishlistPage from './pages/WishlistPage';
import QuestionnairePage from './pages/QuestionnarePage';
import InventoryReportPage from './pages/reports/inventory';
import SalesReportPage from './pages/reports/sales';
import TopSellingProductsReportPage from './pages/reports/top-selling';
import UsersReportPage from './pages/reports/users';
import ReviewsReportPage from './pages/reports/reviews';
import PendingOrdersReportPage from './pages/reports/pending-orders';
import AddNewProductPage from './pages/AddNewProductPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import ContactUsReportPage from './pages/reports/contactus/ContactUsReportPage';
import PageContainer from './components/PageContainer';
import PageHeader from './components/PageHeader';
import { Box } from '@mui/material';
import NavigationButton from './components/navigation-button';
import TestPage from './pages/TestPage';
import UserProfilePage from './pages/ProfilePage';

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
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
