import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
