import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
	const { getUserRoles } = useAppContext();
	const location = useLocation();

	const roleComplaint = getUserRoles().some((role) =>
		allowedRoles.includes(role)
	);

	const isAuthenticated = localStorage.getItem('isAuthenticated') || false;
	if (!isAuthenticated || !roleComplaint) {
		return <Navigate to="/login" state={{ returnUrl: location.pathname }} />;
	}

	return children;
};

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
	allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
