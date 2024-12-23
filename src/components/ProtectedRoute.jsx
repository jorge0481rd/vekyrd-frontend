import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, getUserRoles } = useAppContext();

  const roleComplaint = getUserRoles().some((role) =>
    allowedRoles.includes(role)
  );

  if (!isAuthenticated || !roleComplaint) return <Navigate to="/login" />;

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
