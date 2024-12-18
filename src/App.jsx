import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import InventoryPage from './pages/InventoryPage';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" exact Component={HomePage} />
          <Route path="/products" exact Component={ProductsPage} />
          <Route path="/orders" exact Component={OrdersPage} />
          <Route path="/cart" exact Component={CartPage} />
          <Route path="/login" exact Component={LoginPage} />
          <Route path="/register" exact Component={RegisterPage} />
          <Route path="/inventory" exact Component={InventoryPage} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
