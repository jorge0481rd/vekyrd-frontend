import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ returnUrl: location.pathname }} />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
