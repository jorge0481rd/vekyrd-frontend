import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { getUserRoles } = useAppContext();

  const roleComplaint = getUserRoles().some((role) =>
    allowedRoles.includes(role)
  );

  const isAuthenticated = localStorage.getItem('isAuthenticated') || false; // check it here, because it's not available but after the userEffect is executed
  if (!isAuthenticated || !roleComplaint) {
    console.log('no autenticado, taking you to /login', {
      isAuthenticated,
      roleComplaint,
    });
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
