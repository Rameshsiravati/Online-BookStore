import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return null;

  // ❌ Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Admin-only route
  if (adminOnly && !currentUser.roles?.includes("ADMIN")) {
    return <Navigate to="/books" replace />;
  }

  return children;
};

export default ProtectedRoute;
