import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export const RequireAuth = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const RequireUser = ({ children }) => {
  const isUser = useAuthStore((state) => state.isUser);
  const isChannelAdmin = useAuthStore((state) => state.isChannelAdmin);

  if (isUser) return children;
  if (isChannelAdmin) return <Navigate to="/dashboard/user-videos" replace />;
  return <Navigate to="/dashboard" replace />;
};

export const RequirePlatformAdmin = ({ children }) => {
  const isChannelAdmin = useAuthStore((state) => state.isChannelAdmin);
  const isUser = useAuthStore((state) => state.isUser);

  if (isUser) return <Navigate to="/user-dashboard" replace />;
  return isChannelAdmin ? (
    <Navigate to="/dashboard/user-videos" replace />
  ) : (
    children
  );
};

export const RequireChannelAdmin = ({ children }) => {
  const isChannelAdmin = useAuthStore((state) => state.isChannelAdmin);
  const isUser = useAuthStore((state) => state.isUser);

  if (isUser) return <Navigate to="/user-dashboard" replace />;
  return isChannelAdmin ? children : <Navigate to="/dashboard" replace />;
};

export const PublicOnly = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const defaultDashboardRoute = useAuthStore(
    (state) => state.defaultDashboardRoute,
  );

  return isAuthenticated ? (
    <Navigate to={defaultDashboardRoute} replace />
  ) : (
    children
  );
};
