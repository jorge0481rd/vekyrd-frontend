export const requireAuth = (isAuthenticated, navigate, currentPath) => {
  if (!isAuthenticated) {
    navigate('/login', { state: { returnUrl: currentPath } });
  }
};
