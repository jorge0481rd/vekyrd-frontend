import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, userRole } = useAppContext();

  if (!isAuthenticated || !allowedRoles.includes(userRole))
    return <Navigate to="/login" />;

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
