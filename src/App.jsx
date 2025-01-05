import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

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

ModuleRegistry.registerModules([AllCommunityModule]);

console.clear();
console.log('App.jsx: console cleared');

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
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
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
