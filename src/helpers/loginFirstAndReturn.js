export const requireAuth = (isAuthenticated, navigate, requestedPath) => {
  if (!isAuthenticated) {
    navigate(`/login?returnUrl=${encodeURIComponent(requestedPath)}`);
  }
};
