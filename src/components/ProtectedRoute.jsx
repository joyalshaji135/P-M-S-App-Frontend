import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../redux/store";

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();

  // Use selectors from the store
  const currentUser = useSelector(store.selectors.getCurrentUser);
  const currentRole = useSelector(store.selectors.getCurrentRole);

  // Redirect conditions
  if (!currentUser || !currentRole) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentRole)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
