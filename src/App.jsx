import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';

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
import SalesReportPage from './pages/reports/sales/SalesReportPage';

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
            path="/reports/sales"
            element={
              // <ProtectedRoute allowedRoles={[ROLES.admin]}>
              <SalesReportPage />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
